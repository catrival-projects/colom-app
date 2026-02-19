/* Types related to Nominatim geocoding results. */
export interface NominatimCoordinates {
  lat: number;
  lon: number;
}

/* The complete data about a Nominatim geocoding result. */
export interface NominatimResult {
  lat: string;
  lon: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  [key: string]: any;
}
