'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Department } from '@/types/department';
import { OpenStreetMap, GoogleMap } from '@/components/maps';
import { fetchDepartmentById } from '@/services/department-service';

export default function DepartmentPage() {
  const params = useParams();
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDepartment() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDepartmentById(Number(params.id));
        setDepartment(data);
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
    if (params.id) loadDepartment();
  }, [params.id]);

  if (loading) return <div className="text-center py-8">Cargando...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!department) return null;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>{department.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-gray-700">{department.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge>Superficie: {department.surface} km²</Badge>
            <Badge>Población: {department.population}</Badge>
            <Badge>Prefijo Telefónico: {department.phonePrefix}</Badge>
            {department.cityCapital && <Badge>Capital: {department.cityCapital.name}</Badge>}
          </div>
        </CardContent>
      </Card>
      {process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ? (
        <GoogleMap cityName={department.name} />
      ) : (
        <OpenStreetMap cityName={department.name} />
      )}
    </div>
  );
}
