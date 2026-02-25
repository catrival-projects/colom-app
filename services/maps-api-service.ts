export async function checkGoogleMapsAvailable(): Promise<boolean> {
  try {
    const res = await fetch('/api/maps/config');
    const data = await res.json();
    return Boolean(data.available);
  } catch {
    return false;
  }
}

export async function getGoogleMapsEmbedUrl(city: string): Promise<string> {
  const res = await fetch(`/api/maps/embed?city=${encodeURIComponent(city)}`);
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || 'Error al obtener URL del mapa');
  }
  const data = await res.json();
  return data.url;
}

export async function getGoogleMapsScriptUrl(): Promise<string | null> {
  const res = await fetch('/api/maps/script');
  if (!res.ok) return null;
  const data = await res.json();
  return data.scriptUrl;
}
