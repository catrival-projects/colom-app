import { NextRequest, NextResponse } from 'next/server';

/**
 * GET /api/maps/embed?city=<name>
 * Returns the Google Maps embed URL with the API key injected server-side.
 */
export async function GET(request: NextRequest) {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Google Maps API key is not configured' }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'Missing required parameter: city' }, { status: 400 });
  }

  const encodedCity = encodeURIComponent(city);
  const url = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedCity}`;

  return NextResponse.json({ url });
}
