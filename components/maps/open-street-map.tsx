'use client';

/**
 * OpenStreetMap Component
 * Component that renders an OpenStreetMap embed using Nominatim for coordinate lookup
 */
import { useCityCoordinates } from '@/lib/hooks/use-city-coordinates';
import { MapUrlService } from '@/services/map-urls-service';
import { MapIframe, MapLoading, MapError } from '@/components/ui/map';

export interface OpenStreetMapProps {
  cityName: string;
  height?: number;
  width?: string;
}

export function OpenStreetMap({ cityName, height = 450, width = '100%' }: OpenStreetMapProps) {
  const { coordinates, loading, error } = useCityCoordinates(cityName);

  if (loading) {
    return <MapLoading cityName={cityName} height={height} />;
  }

  if (error) {
    return <MapError error={error} height={height} />;
  }

  const mapUrl = MapUrlService.generateOpenStreetMapUrl({ cityName, coordinates });

  if (!mapUrl) {
    return <MapError error="No se pudo generar la URL del mapa" height={height} />;
  }

  return (
    <div className="map-container w-full rounded-lg overflow-hidden pt-4">
      <MapIframe src={mapUrl} title={`Map of ${cityName}`} width={width} height={height} />
    </div>
  );
}
