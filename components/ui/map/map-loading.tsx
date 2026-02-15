'use client';

/**
 * MapLoading Component
 * Pure presentational component for loading state
 */
export interface MapLoadingProps {
  cityName: string;
  height?: number;
}

export function MapLoading({ cityName, height = 450 }: MapLoadingProps) {
  return (
    <div
      style={{ height }}
      className="w-full rounded-lg overflow-hidden pt-4 bg-gray-100 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="animate-pulse mb-2">
          <div className="h-8 w-8 bg-gray-300 rounded-full mx-auto"></div>
        </div>
        <p className="text-gray-600">Cargando mapa de {cityName}...</p>
      </div>
    </div>
  );
}
