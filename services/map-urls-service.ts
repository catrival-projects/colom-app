import type { MapUrlConfig } from '../types/map-url-config';

/**
 * Map URL Service
 * Responsible for generating map embed URLs for different providers
 */
export class MapUrlService {
  /** Generate OpenStreetMap embed URL with bounding box. */
  static generateOpenStreetMapUrl(config: MapUrlConfig): string | null {
    if (!config.coordinates) {
      return null;
    }

    const { lat, lon } = config.coordinates;
    const padding = 0.05;

    const bbox = `${lon - padding},${lat - padding},${lon + padding},${lat + padding}`;
    const url =
      `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}` +
      `&search=${encodeURIComponent(config.cityName)}`;

    return url;
  }

  /** Generate Google Maps embed URL for a given city. */
  static generateGoogleMapUrl(config: MapUrlConfig): string | null {
    if (!config.apiKey) {
      console.warn('Google Maps API key is missing');
      return null;
    }

    const encodedCity = encodeURIComponent(config.cityName);
    const url = `https://www.google.com/maps/embed/v1/place?key=${config.apiKey}&q=${encodedCity}`;

    return url;
  }

  /** Generate map URL based on provider (fallback to OSM if no API key). */
  static generateMapUrl(provider: 'google' | 'osm', config: MapUrlConfig): string | null {
    if (provider === 'google') {
      const googleUrl = this.generateGoogleMapUrl(config);
      if (googleUrl) return googleUrl;

      // Fallback to OpenStreetMap if Google Maps not available
      console.warn('Google Maps URL generation failed, falling back to OpenStreetMap');
      return this.generateOpenStreetMapUrl(config);
    }

    return this.generateOpenStreetMapUrl(config);
  }
}
