'use client';

/**
 * MapError Component
 * Pure presentational component for error state
 */
export interface MapErrorProps {
  error: string;
  height?: number;
  onRetry?: () => void;
}

export function MapError({ error, height = 450, onRetry }: MapErrorProps) {
  return (
    <div
      style={{ height }}
      className="w-full rounded-lg overflow-hidden pt-4 bg-red-50 border border-red-200 flex items-center justify-center"
    >
      <div className="text-center px-4">
        <div className="text-red-600 mb-2">
          <svg
            className="w-8 h-8 mx-auto"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <p className="text-red-700 font-semibold mb-2">Error al cargar el mapa</p>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm transition-colors"
          >
            Reintentar
          </button>
        )}
      </div>
    </div>
  );
}
