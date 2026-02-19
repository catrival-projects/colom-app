'use client';
import { useEffect, useState } from 'react';
import InteractiveColombiaMap from './interactive-colombia-map';
import TouristCards from './tourist-cards';
import { fetchTouristicAttractions } from '@/services/touristic-attraction-service';
import { fetchAirports } from '@/services/airport-service';
import type { Airport } from '@/types/airport';
import type { TouristicAttraction } from '@/types/touristic-attraction';

export default function MapDataLoader() {
  const [attractions, setAttractions] = useState<TouristicAttraction[]>([]);
  const [airports, setAirports] = useState<Airport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attractions, airports] = await Promise.all([
          fetchTouristicAttractions(),
          fetchAirports(),
        ]);
        setAttractions(attractions);
        setAirports(airports);
      } catch (error) {
        console.error('Error al cargar datos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Cargando Colombia en un vistazo...
      </div>
    );

  return (
    <>
      <TouristCards attractions={attractions} />
      <InteractiveColombiaMap attractions={attractions} airports={airports} />
    </>
  );
}
