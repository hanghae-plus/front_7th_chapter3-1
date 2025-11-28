import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const tableVariants = cva('font-roboto w-full border-collapse caption-bottom bg-background text-base', {
  variants: {
    variant: {
      default: '',
      bordered: 'table-bordered border border-border',
      striped: 'table-striped',
      hover: 'table-hover',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

function Table({
  className,
  variant,
  ...props
}: React.ComponentProps<'table'> & VariantProps<typeof tableVariants>) {
  return (
    <div data-slot="table-container" className="table-container relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn(tableVariants({ variant }), 'table', className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return (
    <thead
      data-slot="table-header"
      className={cn('bg-elevated [&_tr]:border-b', className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0 [&_tr:last-child_td]:border-b-0', className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn('bg-muted/50 border-t font-medium [&>tr]:last:border-b-0', className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'data-[state=selected]:bg-muted border-b transition-colors',
        '[.table-hover_tbody_&]:hover:bg-hover-overlay',
        '[.table-striped_tbody_&:nth-child(even)]:bg-elevated',
        className
      )}
      {...props}
    />
  );
}

function TableHead({
  className,
  children,
  isSortable,
  sortDirection,
  ...props
}: React.ComponentProps<'th'> & { isSortable?: boolean; sortDirection?: 'asc' | 'desc' }) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'text-foreground h-10 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        'p-md border-b-2 border-border text-xs tracking-[0.03em] text-foreground-medium uppercase',
        'in-[.table-bordered]:border in-[.table-bordered]:border-border',
        isSortable && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
      {isSortable && <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>}
    </th>
  );
}

function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
        'p-md border-b border-border-subtle text-foreground-emphasis',
        'in-[.table-bordered]:border in-[.table-bordered]:border-border',
        className
      )}
      {...props}
    />
  );
}

function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('text-muted-foreground mt-4 text-sm', className)}
      {...props}
    />
  );
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
