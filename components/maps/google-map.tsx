'use client';

/**
 * GoogleMap Component
 * Component that renders a Google Maps embed
 */
import { useCityCoordinates } from '@/lib/hooks/use-city-coordinates';
import { MapUrlService } from '@/services/map-urls-service';
import { MapIframe, MapError } from '@/components/ui/map';

export interface GoogleMapProps {
  cityName: string;
  height?: number;
  width?: string;
}

export function GoogleMap({ cityName, height = 450, width = '100%' }: GoogleMapProps) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const { coordinates } = useCityCoordinates(cityName);

  if (!apiKey) {
    return (
      <MapError
        error="Google Maps API key is not configured. Please add GOOGLE_MAPS_API_KEY to your environment variables."
        height={height}
      />
    );
  }

  const mapUrl = MapUrlService.generateGoogleMapUrl({
    cityName,
    coordinates,
    apiKey,
  });

  if (!mapUrl) {
    return <MapError error="No se pudo generar la URL del mapa de Google" height={height} />;
  }

  return (
    <div className="map-container w-full rounded-lg overflow-hidden pt-4">
      <MapIframe src={mapUrl} title={`Google Map of ${cityName}`} width={width} height={height} />
    </div>
  );
}
