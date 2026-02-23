'use client';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import DepartmentsTable from './departments-table';
import Header from '@/components/shared/header';
import { useDepartmentStore } from '@/lib/stores/department-store';
import React from 'react';

function Departments({ className, ...props }: React.ComponentProps<'div'>) {
  const { departments, loading, error, hasFetched, fetchDepartments } = useDepartmentStore();

  // Show loading during hydration (hasFetched=false before sessionStorage rehydrates)
  // and during active API fetches
  const isLoading = loading || (!hasFetched && !error);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  return (
    <div
      data-slot="departments"
      className={cn(
        'mx-auto w-full max-w-5xl min-w-0 content-center items-start gap-8 p-4 pt-2 sm:gap-12 sm:p-6 lg:p-10 2xl:max-w-6xl',
        className
      )}
      {...props}
    >
      <Header title="Departamentos" />
      {error && <div>{error}</div>}
      <DepartmentsTable data={departments} loading={isLoading} />
    </div>
  );
}
export default Departments;
