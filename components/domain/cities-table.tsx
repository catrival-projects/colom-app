'use client';
import React from 'react';
import Image from 'next/image';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
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
import { useDepartmentStore } from '@/lib/stores/department-store';

interface CitiesTableProps {
  pageSize?: number;
}

function useColumns(): ColumnDef<CityData>[] {
  const { getDepartmentName } = useDepartmentStore();

  return React.useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Nombre',
        cell: ({ row }) => {
          const city = row.original;
          return (
            <a
              href={`/city/${city.id}`}
              className="w-20 md:w-36 block truncate text-blue-600 hover:underline"
            >
              {city.name}
            </a>
          );
        },
      },
      {
        accessorKey: 'departmentId',
        header: 'Departamento',
        cell: ({ row }) => {
          const name = getDepartmentName(row.original.departmentId);
          return <span className="w-16 md:w-auto block truncate text-left">{name || '—'}</span>;
        },
      },
    ],
    [getDepartmentName]
  );
}

export default function CitiesTable({ pageSize = 20 }: CitiesTableProps) {
  const { fetchDepartments } = useDepartmentStore();
  const columns = useColumns();
  const [search, setSearch] = React.useState('');
  const [cities, setCities] = React.useState<CityData[]>([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const lastPageRef = React.useRef(0); // Track last page that STARTED loading
  const isScrollLoadingRef = React.useRef(false); // Synchronous gate for scroll events

  // Ensure departments are loaded for name resolution
  React.useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  // Cargar ciudades iniciales y siguientes páginas al hacer scroll
  React.useEffect(() => {
    let ignore = false;
    async function loadCities() {
      // Prevent redundant loads if this page is already handled or we are loading
      if (page <= lastPageRef.current && page !== 1) return;

      setLoading(true);
      lastPageRef.current = page;

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

  // Reset the scroll gate when loading completes
  React.useEffect(() => {
    if (!loading) {
      isScrollLoadingRef.current = false;
    }
  }, [loading]);

  // Scroll infinito via onScroll prop
  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const el = e.currentTarget;
      if (isScrollLoadingRef.current || loading || !hasMore) return;
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 100) {
        isScrollLoadingRef.current = true; // Gate immediately, before React re-renders
        setPage((p) => p + 1);
      }
    },
    [loading, hasMore]
  );

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
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2 max-w-sm bg-background/50 backdrop-blur-sm p-1 rounded-lg border border-border/50 shadow-sm focus-within:ring-1 focus-within:ring-ring transition-all">
        <div className="pl-2 text-muted-foreground">
          <MagnifyingGlassIcon size={16} weight="regular" />
        </div>
        <Input
          placeholder="Buscar territorio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none shadow-none focus-visible:ring-0 bg-transparent h-9 placeholder:text-muted-foreground/70"
        />
      </div>

      {/* Table Container with Infinite Scroll */}
      <div
        onScroll={handleScroll}
        className="rounded-xl border border-border/60 bg-card/50 shadow-sm backdrop-blur-sm overflow-hidden relative"
        style={{
          maxHeight: `calc(100vh - var(--header-height, 220px) - var(--search-bar-height, 85px))`,
          overflowY: 'auto',
        }}
      >
        <Table>
          <TableHeader className="bg-muted/50 text-muted-foreground font-medium border-b border-border/60 sticky top-0 z-10 backdrop-blur-md">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent border-border/60">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-6 py-4 font-semibold tracking-tight first:pl-6 last:pr-6 whitespace-nowrap text-foreground"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="divide-y divide-border/40">
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="group transition-colors hover:bg-accent/30 hover:shadow-[inset_2px_0_0_0_var(--color-primary)] border-border/40"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="px-6 py-4 first:pl-6 last:pr-6 align-top">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {loading && (
          <div className="flex items-center justify-center p-8">
            <Image
              src="/loader.svg"
              alt="Cargando..."
              width={48}
              height={48}
              className="animate-spin"
            />
          </div>
        )}
        {!hasMore && !loading && (
          <div className="p-4 text-center text-muted-foreground text-xs">
            No hay más ciudades para mostrar.
          </div>
        )}
      </div>
      <div className="text-xs text-muted-foreground text-center mt-4">
        Mostrando {filteredData.length} ciudades
      </div>
    </div>
  );
}
