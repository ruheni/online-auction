'use client';

import { statuses } from '@/constant';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { Duration } from 'luxon';
import { Button } from './ui/button';

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: 'name',
    header: () => 'Name',
    cell: ({ row }) => <div className='w-[80px]'>{row.getValue('name')}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'startingPrice',
    header: () => 'Current Price', //todo: need to improve the logic of auction modal. Related to bidding feature...
    cell: ({ row }) => (
      <div className='w-[80px]'>{row.getValue('startingPrice')}$</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'timeWindow',
    header: () => 'Duration',
    cell: ({ row }) => (
      <div className='w-[80px]'>
        {Duration.fromObject({ seconds: row.getValue('timeWindow') }).toFormat(
          'hh:mm:ss'
        )}
      </div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: 'biddingOpen',
    header: () => 'Status',
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('biddingOpen')
      );

      if (!status) {
        return null;
      }

      return (
        <div className='flex w-[100px] items-center'>
          {status.icon && (
            <status.icon
              className={cn('mr-2 h-4 w-4', status?.color && status?.color)}
            />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    header: () => 'Bid',
    cell: ({ row }) => <Button> Bid </Button>,
    enableSorting: false,
    enableHiding: false,
  },
];
