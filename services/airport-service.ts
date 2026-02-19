import type { Airport } from '@/types/airport';

const API_URL = `${process.env.NEXT_PUBLIC_API_COLOMBIA_URL}/Airport`;

/**
 * Fetches a list of airports from the API.
 * @returns Promise with the list of airports
 * @throws Error if unable to fetch the airports
 */
export const fetchAirports = async (): Promise<Airport[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error fetching airports');
  }
  return response.json();
};
