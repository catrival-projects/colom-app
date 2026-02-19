import { TouristicAttraction } from '@/types/touristic-attraction';

const API_URL = `${process.env.NEXT_PUBLIC_API_COLOMBIA_URL}/TouristicAttraction`;

/**
 * Fetches a list of touristic attractions from the API.
 * @returns Promise with the list of touristic attractions
 * @throws Error if unable to fetch the touristic attractions
 */
export const fetchTouristicAttractions = async (): Promise<TouristicAttraction[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Error fetching touristic attractions');
  }
  return response.json();
};
