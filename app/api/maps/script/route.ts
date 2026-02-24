import { NextResponse } from 'next/server';

/**
 * GET /api/maps/script
 * Returns the Google Maps JavaScript SDK script URL with the API key injected server-side.
 */
export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Google Maps API key is not configured' }, { status: 503 });
  }

  const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

  return NextResponse.json({ scriptUrl });
}
