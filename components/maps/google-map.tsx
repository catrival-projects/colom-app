'use client';

import { useEffect, useReducer } from 'react';
import { MapIframe, MapError, MapLoading } from '@/components/ui/map';
import { getGoogleMapsEmbedUrl } from '@/services/maps-api-service';

export interface GoogleMapProps {
  cityName: string;
  height?: number;
  width?: string;
}

type MapState = { mapUrl: string | null; loading: boolean; error: string | null };
type MapAction = { type: 'success'; url: string } | { type: 'error'; error: string };

function mapReducer(_state: MapState, action: MapAction): MapState {
  switch (action.type) {
    case 'success':
      return { mapUrl: action.url, loading: false, error: null };
    case 'error':
      return { mapUrl: null, loading: false, error: action.error };
  }
}

export function GoogleMap({ cityName, height = 450, width = '100%' }: GoogleMapProps) {
  const [{ mapUrl, loading, error }, dispatch] = useReducer(mapReducer, {
    mapUrl: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    async function fetchEmbedUrl() {
      try {
        const url = await getGoogleMapsEmbedUrl(cityName);
        dispatch({ type: 'success', url });
      } catch (err) {
        dispatch({
          type: 'error',
          error: err instanceof Error ? err.message : 'Error desconocido',
        });
      }
    }
    fetchEmbedUrl();
  }, [cityName]);

  if (loading) {
    return <MapLoading cityName={cityName} height={height} />;
  }

  if (error) {
    return <MapError error={error} height={height} />;
  }

  if (!mapUrl) {
    return <MapError error="No se pudo generar la URL del mapa de Google" height={height} />;
  }

  return (
    <div className="map-container w-full rounded-lg overflow-hidden pt-4">
      <MapIframe src={mapUrl} title={`Google Map of ${cityName}`} width={width} height={height} />
    </div>
  );
}
