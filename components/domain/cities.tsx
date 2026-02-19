'use client';
import { cn } from '@/lib/utils';
import Header from '@/components/shared/header';
import CitiesTable from './cities-table';

export default function Cities({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="cities"
      className={cn(
        'mx-auto w-full max-w-5xl min-w-0 content-center items-start gap-8 p-4 pt-2 sm:gap-12 sm:p-6 lg:p-12 2xl:max-w-6xl',
        className
      )}
      {...props}
    >
      <Header title="Ciudades" />
      <CitiesTable />
    </div>
  );
}
