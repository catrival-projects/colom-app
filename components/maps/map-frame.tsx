'use client';

/**
 * MapFrame Component
 * Generic component that renders an iframe with a provided URL
 */
import { MapIframe } from '@/components/ui/map';

export interface MapFrameProps {
  src: string;
  cityName: string;
  height?: number;
  width?: string;
}

export function MapFrame({ src, cityName, height = 450, width = '100%' }: MapFrameProps) {
  return (
    <div className="map-container w-full rounded-lg overflow-hidden pt-4">
      <MapIframe src={src} title={`Map of ${cityName}`} width={width} height={height} />
    </div>
  );
}
