/** The complete data about a map. **/
export interface MapData {
  id: number;
  name: string;
  description: string;
  departmentId: number | null;
  urlImages: string[];
  urlSource: string;
  department: string | null;
}
