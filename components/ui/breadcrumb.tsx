import Link from 'next/link';
import { CaretLeftIcon } from '@phosphor-icons/react';

export function Breadcrumb() {
  return (
    <nav className="flex items-center text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
      <Link href="/" className="flex items-center gap-1 hover:underline text-blue-600">
        <CaretLeftIcon className="w-4 h-4" weight="bold" />
        Volver al inicio
      </Link>
    </nav>
  );
}
