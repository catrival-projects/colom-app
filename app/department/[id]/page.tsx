'use client';
import { useEffect, useReducer, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Department } from '@/types/department';
import { OpenStreetMap, GoogleMap } from '@/components/maps';
import { fetchDepartmentById } from '@/services/department-service';
import { checkGoogleMapsAvailable } from '@/services/maps-api-service';

type PageState = { department: Department | null; loading: boolean; error: string | null };
type PageAction =
  | { type: 'loading' }
  | { type: 'success'; department: Department }
  | { type: 'error'; error: string };

function pageReducer(_state: PageState, action: PageAction): PageState {
  switch (action.type) {
    case 'loading':
      return { department: null, loading: true, error: null };
    case 'success':
      return { department: action.department, loading: false, error: null };
    case 'error':
      return { department: null, loading: false, error: action.error };
  }
}

export default function DepartmentPage() {
  const params = useParams();
  const [{ department, loading, error }, dispatch] = useReducer(pageReducer, {
    department: null,
    loading: true,
    error: null,
  });
  const [googleMapsAvailable, setGoogleMapsAvailable] = useState(false);

  useEffect(() => {
    async function loadDepartment() {
      dispatch({ type: 'loading' });
      try {
        const data = await fetchDepartmentById(Number(params.id));
        dispatch({ type: 'success', department: data });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Ocurrió un error desconocido';
        dispatch({ type: 'error', error: message });
      }
    }
    if (params.id) loadDepartment();
  }, [params.id]);

  useEffect(() => {
    checkGoogleMapsAvailable().then(setGoogleMapsAvailable);
  }, []);

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
      {googleMapsAvailable ? (
        <GoogleMap cityName={department.name} />
      ) : (
        <OpenStreetMap cityName={department.name} />
      )}
    </div>
  );
}
