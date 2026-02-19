'use client';

import { useEffect, useState, useRef } from 'react';
import LayerToggle from './layer-toggle';
import type { MapLayer } from '@/types/map-layer';
import type { TouristicAttraction } from '@/types/touristic-attraction';
import type { Airport } from '@/types/airport';

const COLOMBIA_CENTER = { lat: 4.5709, lng: -74.2973 };

interface InteractiveColombiaMapProps {
  attractions?: TouristicAttraction[];
  airports?: Airport[];
}

export default function InteractiveColombiaMap({
  attractions = [],
  airports = [],
}: InteractiveColombiaMapProps) {
  const [activeLayers, setActiveLayers] = useState<MapLayer[]>(['attractions']);
  const [mapScript, setMapScript] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleLayerToggle = (layer: MapLayer) => {
    setActiveLayers((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    );
  };

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      console.error('Google Maps API key is not configured');
      return;
    }

    const scriptId = 'google-maps-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => setMapScript(true);
      document.head.appendChild(script);
    } else if (window.google && window.google.maps) {
      setTimeout(() => setMapScript(true), 0);
    } else {
      script.onload = () => setMapScript(true);
    }

    return () => {
      // Solo limpia el callback para evitar fugas, pero no elimines el script global
      if (script) script.onload = null;
    };
  }, []);

  useEffect(() => {
    if (!mapScript || !mapRef.current) return;
    if (!window.google || !window.google.maps) return;

    const existingMap = (mapRef.current as HTMLElement & { __googleMap?: google.maps.Map })
      .__googleMap as google.maps.Map | undefined;
    const map =
      existingMap ||
      new window.google.maps.Map(mapRef.current, {
        center: COLOMBIA_CENTER,
        zoom: 5,
        mapTypeId: 'terrain',
        styles: [
          {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [{ color: '#444444' }],
          },
          {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [{ color: '#f2f2f2' }],
          },
          {
            featureType: 'water',
            elementType: 'all',
            stylers: [{ color: '#c6d9ff' }, { visibility: 'on' }],
          },
        ],
      });
    if (!existingMap) {
      (mapRef.current as HTMLElement & { __googleMap?: google.maps.Map }).__googleMap = map;
    }

    // Add markers for airports.
    if (activeLayers.includes('airports') && airports.length > 0) {
      airports.forEach((airport) => {
        if (
          typeof airport.latitude === 'number' &&
          typeof airport.longitude === 'number' &&
          !isNaN(airport.latitude) &&
          !isNaN(airport.longitude)
        ) {
          new window.google.maps.Marker({
            position: { lat: airport.longitude, lng: airport.latitude },
            map: map,
            title: airport.name,
            icon: {
              path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
              scale: 1.2,
              fillColor: '#1976D2',
              fillOpacity: 0.9,
              strokeColor: '#fff',
              strokeWeight: 2,
            } as google.maps.Symbol,
          });
        }
      });
    }

    // Add markers for attractions.
    if (activeLayers.includes('attractions') && attractions.length > 0) {
      attractions.forEach((attraction) => {
        const lat = parseFloat(attraction.latitude);
        const lng = parseFloat(attraction.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          new window.google.maps.Marker({
            position: { lat, lng },
            map: map,
            title: attraction.name,
            icon: {
              path: 'M0,-20 L5,-10 L15,-10 L7,0 L10,10 L0,5 L-10,10 L-7,0 L-15,-10 L-5,-10 Z',
              scale: 0.8,
              fillColor: '#FF9800',
              fillOpacity: 0.8,
              strokeColor: '#fff',
              strokeWeight: 2,
            } as google.maps.Symbol,
          });
        }
      });
    }
  }, [mapScript, activeLayers, attractions, airports]);

  return (
    <div className="w-full max-w-4xl">
      <LayerToggle activeLayers={activeLayers} onLayerToggle={handleLayerToggle} />

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div
          ref={mapRef}
          className="w-full h-96 md:h-125 bg-gray-100 flex items-center justify-center"
          style={{ minHeight: '400px' }}
        />
      </div>

      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>Interactúa con las capas para explorar diferentes zonas de Colombia</p>
      </div>
    </div>
  );
}
