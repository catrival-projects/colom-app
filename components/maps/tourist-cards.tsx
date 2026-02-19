import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import type { TouristicAttraction } from '@/types/touristic-attraction';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { ArrowClockwiseIcon } from '@phosphor-icons/react';

interface TouristCardsProps {
  attractions: TouristicAttraction[];
}

function getRandomItems<T>(arr: T[], n: number, seed?: number): T[] {
  if (arr.length <= n) return arr;
  const result: T[] = [];
  const used = new Set<number>();
  const random = seed !== undefined ? mulberry32(seed) : Math.random;
  while (result.length < n) {
    const idx = Math.floor(random() * arr.length);
    if (!used.has(idx)) {
      used.add(idx);
      result.push(arr[idx]);
    }
  }
  return result;
}

// Simple seeded random generator
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function TouristCards({ attractions }: TouristCardsProps) {
  const [seed, setSeed] = useState(() => Date.now());
  const randomAttractions = useMemo(
    () => getRandomItems(attractions, 4, seed),
    [attractions, seed]
  );
  if (!randomAttractions.length) return null;

  function handleRefresh() {
    setSeed(Date.now() + Math.floor(Math.random() * 10000));
  }

  return (
    <section className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex items-center justify-center mb-4 gap-2">
        <h2 className="text-xl font-bold text-center m-0">Lugares turísticos destacados</h2>
        <button
          type="button"
          aria-label="Refrescar tarjetas"
          onClick={handleRefresh}
          className="ml-2 px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs border border-blue-200 transition-colors flex items-center gap-1"
        >
          <ArrowClockwiseIcon className="size-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {randomAttractions.map((attr, i) => (
          <Card key={attr.id || i}>
            {attr.images && attr.images.length > 0 && (
              <Image
                src={attr.images[0]}
                alt={attr.name}
                className="w-full h-40 object-cover rounded-t"
                loading="lazy"
                width={400}
                height={160}
                style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                unoptimized
              />
            )}
            <CardHeader>
              <CardTitle>{attr.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground line-clamp-4">
                {attr.description || 'Sin descripción disponible.'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
