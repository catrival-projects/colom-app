'use client';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { Department } from '@/types/department';
import DepartmentsTable from './departments-table';
import Header from '@/components/shared/header';
import { fetchDepartments } from '@/services/department-service';

function Departments({ className, ...props }: React.ComponentProps<'div'>) {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDepartments() {
      try {
        const data = await fetchDepartments();
        setDepartments(data);
      } catch (err) {
        setError(
          'Error al obtener los departamentos. ' +
            (err instanceof Error ? err.message : String(err))
        );
      }
    }
    loadDepartments();
  }, []);

  return (
    <div
      data-slot="departments"
      className={cn(
        'mx-auto w-full max-w-5xl min-w-0 content-center items-start gap-8 p-4 pt-2 sm:gap-12 sm:p-6 lg:p-10 2xl:max-w-6xl',
        className
      )}
      {...props}
    >
      <Header title="Departamentos" />
      {error && <div>{error}</div>}
      {departments.length > 0 ? (
        <DepartmentsTable data={departments} />
      ) : (
        !error && <div>Cargando departamentos...</div>
      )}
    </div>
  );
}
export default Departments;
