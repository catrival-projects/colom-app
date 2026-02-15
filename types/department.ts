import { CityData } from './city-data';

/** The complete data about a department. */
export interface Department {
  id: number;
  name: string;
  description: string;
  cityCapitalId: number;
  municipalities: number;
  surface: number;
  population: number;
  phonePrefix: string;
  countryId: number;
  cityCapital: CityData;
  country: object | null;
  cities: object[] | null;
  regionId: number;
  region: object | null;
  naturalAreas: string[] | null;
  maps: string[] | null;
  indigenousReservations: string[] | null;
  airports: string[] | null;
}
