'use client';

import { useEffect, useState, useRef } from 'react';
import LayerToggle from './layer-toggle';
import type { TouristicAttraction } from '@/types/touristic-attraction';
import type { Airport } from '@/types/airport';
import type { MapLayerId } from '@/types/map-layer';
import { getGoogleMapsScriptUrl } from '@/services/maps-api-service';

const COLOMBIA_CENTER = { lat: 4.5709, lng: -74.2973 };
const EMPTY_ATTRACTIONS: TouristicAttraction[] = [];
const EMPTY_AIRPORTS: Airport[] = [];

interface InteractiveColombiaMapProps {
  attractions?: TouristicAttraction[];
  airports?: Airport[];
}

export default function InteractiveColombiaMap({
  attractions = EMPTY_ATTRACTIONS,
  airports = EMPTY_AIRPORTS,
}: InteractiveColombiaMapProps) {
  const [activeLayers, setActiveLayers] = useState<MapLayerId[]>(['attractions']);
  const [mapScript, setMapScript] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  const handleLayerToggle = (layerId: MapLayerId) => {
    setActiveLayers((prev) =>
      prev.includes(layerId) ? prev.filter((l) => l !== layerId) : [...prev, layerId]
    );
  };

  useEffect(() => {
    async function loadGoogleMapsScript() {
      const scriptUrl = await getGoogleMapsScriptUrl();
      if (!scriptUrl) {
        console.error('Google Maps API key is not configured');
        return;
      }

      const onScriptReady = () => setMapScript(true);
      const scriptId = 'google-maps-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = scriptUrl;
        script.async = true;
        script.defer = true;
        script.onload = onScriptReady;
        document.head.appendChild(script);
      } else if (window.google && window.google.maps) {
        setTimeout(onScriptReady, 0);
      } else {
        script.onload = onScriptReady;
      }
    }

    loadGoogleMapsScript();
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

    // Limpiar marcadores previos
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    // Agregar marcadores de aeropuertos
    if (activeLayers.includes('airports') && airports.length > 0) {
      airports.forEach((airport) => {
        if (
          typeof airport.latitude === 'number' &&
          typeof airport.longitude === 'number' &&
          !isNaN(airport.latitude) &&
          !isNaN(airport.longitude)
        ) {
          const marker = new window.google.maps.Marker({
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
          markersRef.current.push(marker);
        }
      });
    }

    // Agregar marcadores de atracciones
    if (activeLayers.includes('attractions') && attractions.length > 0) {
      attractions.forEach((attraction) => {
        const lat = parseFloat(attraction.latitude);
        const lng = parseFloat(attraction.longitude);
        if (!isNaN(lat) && !isNaN(lng)) {
          const marker = new window.google.maps.Marker({
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
          markersRef.current.push(marker);
          markersRef.current.push(marker);
        }
      });
    }
  }, [mapScript, activeLayers, attractions, airports]);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4">
      <LayerToggle activeLayers={activeLayers} onLayerToggle={handleLayerToggle} />

      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-primary/20 to-accent/20 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-card rounded-2xl border-border/60 shadow-lg overflow-hidden">
          <div ref={mapRef} className="w-full h-125 md:h-150 bg-muted/20" />
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="px-4 py-2 bg-background/50 backdrop-blur-sm rounded-full border border-border/50 text-xs text-muted-foreground shadow-sm">
          Interactúa con las capas para explorar la riqueza de Colombia
        </div>
      </div>
    </div>
  );
}
