import { Department } from '@/types/department';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_COLOMBIA_URL}/Department`;

/** Get all departments from the API. */
export async function fetchDepartments(): Promise<Department[]> {
  const res = await fetch(BASE_URL, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error('Error al obtener los departamentos');
  }
  return res.json();
}

/** Get a single department by ID from the API. */
export async function fetchDepartmentById(id: number): Promise<Department> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error('No se pudo obtener la información del departamento');
  }
  return res.json();
}
