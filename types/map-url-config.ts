import type { NominatimCoordinates } from './nominatim';

/** Map URL Configuration. */
export interface MapUrlConfig {
  cityName: string;
  coordinates?: NominatimCoordinates | null;
  apiKey?: string;
  isDepartment?: boolean;
}
