import type { CityData } from './city-data';

export interface TouristicAttraction {
  id: number;
  name: string;
  description: string;
  images: string[];
  latitude: string;
  longitude: string;
  cityId: number;
  city: CityData;
}
