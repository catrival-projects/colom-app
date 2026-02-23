import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Department } from '@/types/department';
import { fetchDepartments as fetchDepartmentsApi } from '@/services/department-service';

interface DepartmentState {
  departments: Department[];
  loading: boolean;
  error: string | null;
  hasFetched: boolean;
  fetchDepartments: () => Promise<void>;
  getDepartmentName: (departmentId: number) => string;
}

export const useDepartmentStore = create<DepartmentState>()(
  persist(
    (set, get) => ({
      departments: [],
      loading: false,
      error: null,
      hasFetched: false,

      fetchDepartments: async () => {
        // Skip fetch if data is already loaded or currently loading
        if (get().hasFetched || get().loading) return;

        set({ loading: true, error: null });
        try {
          const data = await fetchDepartmentsApi();
          set({ departments: data, hasFetched: true, loading: false });
        } catch (err) {
          set({
            error:
              'Error al obtener los departamentos. ' +
              (err instanceof Error ? err.message : String(err)),
            loading: false,
          });
        }
      },

      getDepartmentName: (departmentId: number) => {
        const dept = get().departments.find((d) => d.id === departmentId);
        return dept?.name ?? '';
      },
    }),
    {
      name: 'department-store',
      storage: createJSONStorage(() => sessionStorage),
      // Only persist the data, not transient UI state
      partialize: (state) => ({
        departments: state.departments,
        hasFetched: state.hasFetched,
      }),
    }
  )
);
