import { CityData } from '@/types/city-data';

/**
 * Obtiene una lista paginada de ciudades desde la API.
 * @param page Número de página (inicia en 1)
 * @param pageSize Cantidad de elementos por página
 */
export interface CitiesPagedResponse {
  page: number;
  pageSize: number;
  totalRecords: number;
  pageCount: number;
  data: CityData[];
}

/**
 * Fetches a paginated list of cities from the API.
 * @param page Page number (starting from 1).
 * @param pageSize Number of items per page.
 * @returns Promise with the paginated list of cities.
 */
export async function fetchCitiesPaged(
  page: number = 1,
  pageSize: number = 10
): Promise<CitiesPagedResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_COLOMBIA_URL}/City/pagedList?page=${page}&pagesize=${pageSize}`
  );
  if (!res.ok) throw new Error('No se pudo obtener la lista paginada de ciudades');
  return await res.json();
}

/** Get a single city by ID from the API. */
export async function fetchCityById(id: string): Promise<CityData> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_COLOMBIA_URL}/City/${id}`);
  if (!res.ok) throw new Error('No se pudo obtener la información de la ciudad');
  return await res.json();
}
