import { Department } from '@/types/department';

const BASE_URL = 'https://api-colombia.com/api/v1/Department';

/**
 * Obtiene todos los departamentos
 */
export async function fetchDepartments(): Promise<Department[]> {
  const res = await fetch(BASE_URL, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error('Error al obtener los departamentos');
  }
  return res.json();
}

/**
 * Obtiene un departamento por ID
 */
export async function fetchDepartmentById(id: number): Promise<Department> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) {
    throw new Error('No se pudo obtener la información del departamento');
  }
  return res.json();
}
