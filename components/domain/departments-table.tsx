'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { normalize } from '@/lib/utils';
import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Department } from '@/types/department';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

/* The departments table component. */
interface DepartmentsTableProps {
  data: Department[];
}

const columns: ColumnDef<Department>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const department = row.original;
      return (
        <a
          href={`/department/${department.id}`}
          className="w-20 md:w-36 block truncate text-blue-600 hover:underline"
        >
          {department.name}
        </a>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
    cell: ({ row }) => (
      <div className="min-w-32 md:min-w-72 w-full">
        <DescriptionCell description={row.original.description} />
      </div>
    ),
  },
  {
    accessorKey: 'population',
    header: 'Población',
    cell: ({ getValue }) => (
      <span className="w-16 md:w-auto block truncate text-right">{getValue() as string}</span>
    ),
  },
  {
    id: 'capital',
    header: 'Capital',
    cell: ({ row }) => {
      const city = row.original.cityCapital;
      if (!city) return '';
      return (
        <a
          href={`/city/${city.id}`}
          className="w-20 md:w-auto block truncate text-blue-600 hover:underline"
        >
          {city.name}
        </a>
      );
    },
  },
  {
    id: 'capitalPopulation',
    header: 'Población Capital',
    cell: ({ row }) => (
      <span className="w-16 md:w-auto block truncate text-right">
        {row.original.cityCapital?.population ?? ''}
      </span>
    ),
  },
];

function DescriptionCell({ description }: { description: string }) {
  const [expanded, setExpanded] = React.useState(false);
  const isLong = description.length > 120;
  return (
    <div className="min-w-44 sm:min-w-56 md:min-w-72 w-full">
      <span
        className={
          expanded
            ? 'block whitespace-pre-line'
            : 'line-clamp-2 block overflow-hidden text-ellipsis whitespace-pre-line'
        }
        style={{
          display: '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : 2,
          WebkitBoxOrient: 'vertical',
          WebkitBoxAlign: 'start',
          overflow: expanded ? 'visible' : 'hidden',
          textOverflow: 'ellipsis',
          width: '100%',
        }}
      >
        {description}
      </span>
      {isLong && (
        <button
          className="text-blue-600 hover:underline ml-2 text-xs cursor-pointer"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </div>
  );
}

export default function DepartmentsTable({ data }: DepartmentsTableProps) {
  // Status for the search term.
  const [search, setSearch] = React.useState('');

  // Memoized filtered data based on the search term.
  const filteredData = React.useMemo(() => {
    if (!search.trim()) return data;
    const term = normalize(search);
    return data.filter(
      (d) =>
        normalize(d.name).includes(term) ||
        (d.cityCapital && normalize(d.cityCapital.name).includes(term))
    );
  }, [data, search]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-4">
      {/* Search Bar - Floating above */}
      <div className="flex items-center gap-2 max-w-sm bg-background/50 backdrop-blur-sm p-1 rounded-lg border border-border/50 shadow-sm focus-within:ring-1 focus-within:ring-ring transition-all">
        <div className="pl-2 text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
          </svg>
        </div>
        <Input
          placeholder="Buscar territorio..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-none shadow-none focus-visible:ring-0 bg-transparent h-9 placeholder:text-muted-foreground/70"
        />
      </div>

      {/* Topographic Card Container */}
      <div className="rounded-xl border border-border/60 bg-card/50 shadow-sm backdrop-blur-sm overflow-hidden relative max-h-[calc(100vh-305px)] overflow-y-auto">
        <Table>
          <TableHeader className="bg-muted/50 text-muted-foreground font-medium border-b border-border/60">
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

        {filteredData.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            No se encontraron resultados para &quot;{search}&quot;
          </div>
        )}
      </div>
      <div className="text-xs text-muted-foreground text-center mt-4">
        Mostrando {filteredData.length} territorios
      </div>
    </div>
  );
}
