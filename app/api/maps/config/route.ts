import { NextResponse } from 'next/server';

/**
 * GET /api/maps/config
 * Returns whether Google Maps API key is configured (without exposing the key).
 */
export async function GET() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  return NextResponse.json({
    available: Boolean(apiKey),
  });
}
