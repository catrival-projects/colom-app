export type MapLayer = 'attractions' | 'airports';

/* The complete data about a map layer. */
export interface LayerType {
  id: MapLayer;
  label: string;
  icon: string;
  description: string;
}
/* The available map layers in the application. */
export const MAP_LAYERS: LayerType[] = [
  {
    id: 'attractions',
    label: 'Sitios Naturales',
    icon: '🏔️',
    description: 'Atracciones turísticas y sitios naturales',
  },
  {
    id: 'airports',
    label: 'Aeropuertos',
    icon: '✈️',
    description: 'Aeropuertos principales de Colombia',
  },
];
