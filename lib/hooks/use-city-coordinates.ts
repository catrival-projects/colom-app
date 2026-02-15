'use client';

import { useEffect, useState, useCallback } from 'react';
import { NominatimService, NominatimCoordinates } from '@/services//nominatim-service';

export interface UseCityCoordinatesResult {
  coordinates: NominatimCoordinates | null;
  loading: boolean;
  error: string | null;
}

export function useCityCoordinates(cityName: string): UseCityCoordinatesResult {
  const [coordinates, setCoordinates] = useState<NominatimCoordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCoordinates = useCallback(async () => {
    if (!cityName.trim()) {
      setCoordinates(null);
      setError('City name cannot be empty');
      return;
    }

    setLoading(true);
    setError(null);

    const abortController = new AbortController();

    try {
      const result = await NominatimService.fetchCoordinates(cityName, abortController.signal);

      if (result) {
        setCoordinates(result);
        setError(null);
      } else {
        setCoordinates(null);
        setError(`Could not find coordinates for: ${cityName}`);
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message);
        setCoordinates(null);
      }
    } finally {
      setLoading(false);
    }

    return () => {
      abortController.abort();
    };
  }, [cityName]);

  useEffect(() => {
    const cleanup = fetchCoordinates();
    return () => {
      cleanup?.then((fn) => fn?.());
    };
  }, [fetchCoordinates]);

  return { coordinates, loading, error };
}
