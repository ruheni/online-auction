'use client';

import { Table } from '@tanstack/react-table';

import { statuses } from '@/constant';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        {table.getColumn('biddingOpen') && (
          <DataTableFacetedFilter
            column={table.getColumn('biddingOpen')}
            title='Bidding Open'
            options={statuses}
          />
        )}
      </div>
    </div>
  );
}
