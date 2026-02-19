'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { normalize } from '@/lib/utils';
import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from '@tanstack/react-table';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { CityData } from '@/types/city-data';
import { fetchCitiesPaged, CitiesPagedResponse } from '@/services/city-service';

interface CitiesTableProps {
  pageSize?: number;
}

const columns: ColumnDef<CityData>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const city = row.original;
      return (
        <a
          href={`/city/${city.id}`}
          className="w-20 md:w-35 block truncate text-blue-600 hover:underline"
        >
          {city.name}
        </a>
      );
    },
  },
  {
    accessorKey: 'population',
    header: 'Población',
    cell: ({ getValue }) => (
      <span className="w-16 md:w-auto block truncate text-left">{getValue() as string}</span>
    ),
  },
];

export default function CitiesTable({ pageSize = 20 }: CitiesTableProps) {
  const [search, setSearch] = React.useState('');
  const [cities, setCities] = React.useState<CityData[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  // Cargar ciudades iniciales y siguientes páginas al hacer scroll
  React.useEffect(() => {
    let ignore = false;
    async function loadCities() {
      setLoading(true);
      try {
        const response: CitiesPagedResponse = await fetchCitiesPaged(page, pageSize);
        const data = response.data || [];
        if (!ignore) {
          setCities((prev) => {
            // Evitar duplicados si la página ya fue cargada
            if (page === 1) return data;
            const ids = new Set(prev.map((c) => c.id));
            return [...prev, ...data.filter((c) => !ids.has(c.id))];
          });
          setHasMore(data.length === pageSize);
        }
      } catch {
        if (!ignore) setHasMore(false);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadCities();
    return () => {
      ignore = true;
    };
  }, [page, pageSize]);

  // Scroll infinito
  const tableContainerRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const handleScroll = () => {
      const el = tableContainerRef.current;
      if (!el || loading || !hasMore) return;
      // Solo cargar siguiente página si no estamos ya en la última
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100 && !loading) {
        setPage((p) => p + 1);
      }
    };
    const el = tableContainerRef.current;
    if (el) el.addEventListener('scroll', handleScroll);
    return () => {
      if (el) el.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore]);

  // Filtro local por nombre o departamento
  const filteredData = React.useMemo(() => {
    if (!search.trim()) return cities;
    const term = normalize(search);
    return cities.filter(
      (c) =>
        normalize(c.name).includes(term) ||
        (c.department && normalize(c.department.name).includes(term))
    );
  }, [cities, search]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <div className="mb-4 max-w-xs">
        <Input
          placeholder="Buscar ciudad o departamento..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div ref={tableContainerRef} style={{ maxHeight: 600, overflowY: 'auto' }}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && <div className="p-4 text-center">Cargando...</div>}
        {!hasMore && <div className="p-4 text-center text-gray-500">No hay más ciudades.</div>}
      </div>
    </div>
  );
}
