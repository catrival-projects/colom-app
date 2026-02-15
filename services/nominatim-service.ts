/**
 * Nominatim Service
 * Responsible for fetching geographic coordinates from OpenStreetMap's Nominatim API
 */

export interface NominatimCoordinates {
  lat: number;
  lon: number;
}

export interface NominatimResult {
  lat: string;
  lon: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export class NominatimService {
  private static readonly BASE_URL = 'https://nominatim.openstreetmap.org/search';

  /**
   * Fetch coordinates for a given city name
   * @param cityName - The name of the city to search
   * @param signal - AbortSignal for cancelling the request
   * @returns Promise with coordinates or null if not found
   */
  static async fetchCoordinates(
    cityName: string,
    signal?: AbortSignal
  ): Promise<NominatimCoordinates | null> {
    try {
      const encodedCity = encodeURIComponent(cityName);
      const url = `${this.BASE_URL}?format=json&q=${encodedCity}`;

      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error(`Nominatim API error: ${response.statusText}`);
      }

      const data: NominatimResult[] = await response.json();

      if (!data || data.length === 0) {
        return null;
      }

      const { lat, lon } = data[0];
      return {
        lat: Number(lat),
        lon: Number(lon),
      };
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log(`Nominatim request cancelled for: ${cityName}`);
        return null;
      }
      console.error('Error fetching coordinates from Nominatim:', error);
      return null;
    }
  }
}
