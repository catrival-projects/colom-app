'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CityData } from '@/types/city-data';
import { OpenStreetMap, GoogleMap } from '@/components/maps';
import { fetchCityById } from '@/services/city-service';

export default function CityPage() {
  const params = useParams();
  const [city, setCity] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCity() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCityById(params.id as string);
        setCity(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido');
        }
      } finally {
        setLoading(false);
      }
    }
    if (params.id) fetchCity();
  }, [params.id]);

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!city) return null;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{city.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-gray-700">{city.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>Superficie: {city.surface} km²</Badge>
            <Badge>Población: {city.population}</Badge>
            <Badge>Código Postal: {city.postalCode}</Badge>
            {city.department && <Badge>Departamento: {city.department.name}</Badge>}
          </div>
          {city.touristAttractions && city.touristAttractions.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold">Atracciones turísticas:</h3>
              <ul className="list-disc ml-6">
                {city.touristAttractions.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          {city.presidents && city.presidents.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold">Presidentes nacidos aquí:</h3>
              <ul className="list-disc ml-6">
                {city.presidents.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          )}
          {city.indigenousReservations && city.indigenousReservations.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold">Resguardos indígenas:</h3>
              <ul className="list-disc ml-6">
                {city.indigenousReservations.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          )}
          {city.airports && city.airports.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold">Aeropuertos:</h3>
              <ul className="list-disc ml-6">
                {city.airports.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          )}
          {city.radios && city.radios.length > 0 && (
            <div className="mb-4">
              <h3 className="font-semibold">Radios:</h3>
              <ul className="list-disc ml-6">
                {city.radios.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
      {process.env.GOOGLE_MAPS_API_KEY ? (
        <GoogleMap cityName={city.name} />
      ) : (
        <OpenStreetMap cityName={city.name} />
      )}
    </div>
  );
}
