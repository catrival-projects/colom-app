/* The complete data about an airport. */
export interface Airport {
  id: number;
  name: string;
  iataCode: string;
  oaciCode: string;
  type: string;
  departmentId: number;
  department: string;
  cityId: number;
  city: string;
  latitude: number;
  longitude: number;
}
