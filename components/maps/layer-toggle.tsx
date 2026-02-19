'use client';

import { MAP_LAYERS, type MapLayer } from '@/types/map-layer';
import { cn } from '@/lib/utils';

interface LayerToggleProps {
  activeLayers: MapLayer[];
  onLayerToggle: (layer: MapLayer) => void;
}

export default function LayerToggle({ activeLayers, onLayerToggle }: LayerToggleProps) {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 mb-2">
      <h3 className="text-lg font-semibold mb-3">Capas del Mapa</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {MAP_LAYERS.map((layer) => (
          <button
            key={layer.id}
            onClick={() => onLayerToggle(layer.id)}
            className={cn(
              'p-3 rounded-lg border-2 transition-all text-left',
              activeLayers.includes(layer.id)
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300 bg-gray-50 hover:border-blue-400'
            )}
          >
            <div className="flex items-start gap-2">
              <span className="text-2xl">{layer.icon}</span>
              <div>
                <p className="font-semibold text-sm">{layer.label}</p>
                <p className="text-xs text-gray-600">{layer.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
