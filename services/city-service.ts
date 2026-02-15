import { CityData } from '@/types/city-data';

export async function fetchCityById(id: string): Promise<CityData> {
  const res = await fetch(`https://api-colombia.com/api/v1/City/${id}`);
  if (!res.ok) throw new Error('No se pudo obtener la información de la ciudad');
  return await res.json();
}
