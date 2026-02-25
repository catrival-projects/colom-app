'use client';

import { MAP_LAYERS, type MapLayerId } from '@/types/map-layer';
import { cn } from '@/lib/utils';

interface LayerToggleProps {
  activeLayers: MapLayerId[];
  onLayerToggle: (layerId: MapLayerId) => void;
}

export default function LayerToggle({ activeLayers, onLayerToggle }: LayerToggleProps) {
  return (
    <div className="w-full flex justify-center mb-4">
      <div className="bg-background/80 backdrop-blur-md rounded-full border border-border/50 p-1.5 shadow-lg inline-flex gap-2">
        {MAP_LAYERS.map((layer) => {
          const isActive = activeLayers.includes(layer.id);
          return (
            <button
              key={layer.id}
              onClick={() => onLayerToggle(layer.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 border',
                isActive
                  ? 'bg-primary text-primary-foreground border-primary shadow-[0_2px_10px_-2px_var(--color-primary)] scale-105'
                  : 'bg-transparent text-muted-foreground border-transparent hover:bg-secondary/50 hover:text-foreground'
              )}
              aria-label={`Alternar capa ${layer.label}`}
              aria-pressed={isActive}
            >
              <span className="text-lg">{layer.icon}</span>
              <span>{layer.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
