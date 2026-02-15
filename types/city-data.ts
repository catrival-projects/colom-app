import { Department } from './department';

/** The complete data about a city. */
export interface CityData {
  id: number;
  name: string;
  description: string;
  surface: number;
  population: number;
  postalCode: string;
  departmentId: number;
  department: Department | null;
  touristAttractions: string[] | null;
  presidents: string[] | null;
  indigenousReservations: string[] | null;
  airports: string[] | null;
  radios: string[] | null;
}
