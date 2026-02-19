'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { normalize } from '@/lib/utils';
import { useReactTable, ColumnDef, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { Department } from '@/types/department';

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
          className="w-20 md:w-35 block truncate text-blue-600 hover:underline"
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
      <div className="min-w-30 md:min-w-75 w-full">
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
    <div className="min-w-45 sm:min-w-55 md:min-w-75 w-full">
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

  // Dynamic maximum height based on window size.
  const [maxHeight, setMaxHeight] = React.useState(600);
  React.useEffect(() => {
    function updateHeight() {
      setMaxHeight(window.innerHeight - 280); // 280px margin for top/bottom.
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <div>
      <div className="mb-4 max-w-xs">
        <Input
          placeholder="Buscar departamento o ciudad capital..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=""
        />
      </div>
      <div className="overflow-x-auto" style={{ maxHeight: maxHeight, overflowY: 'auto' }}>
        <table className="min-w-full border border-gray-200 table-fixed">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-4 py-2 border">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 border truncate">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
