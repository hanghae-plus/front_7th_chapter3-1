import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const tableVariants = cva('w-full caption-bottom text-sm', {
  variants: {
    variant: {
      default: '',
      striped: '[&_tbody_tr:nth-child(odd)]:bg-muted/50',
    },
    size: {
      sm: '[&_th]:h-8 [&_th]:px-2 [&_td]:p-1.5',
      md: '[&_th]:h-10 [&_th]:px-2 [&_td]:p-2',
      lg: '[&_th]:h-12 [&_th]:px-3 [&_td]:p-3',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

interface TableProps extends React.ComponentProps<'table'>, VariantProps<typeof tableVariants> {}

function Table({ className, variant, size, ...props }: TableProps) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn(tableVariants({ variant, size }), className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={cn('[&_tr]:border-b', className)} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
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

const tableRowVariants = cva('border-b transition-colors', {
  variants: {
    variant: {
      default: 'hover:bg-muted/50',
      selected: 'bg-muted',
      muted: 'bg-muted/30 hover:bg-muted/50',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface TableRowProps extends React.ComponentProps<'tr'>, VariantProps<typeof tableRowVariants> {}

function TableRow({ className, variant, ...props }: TableRowProps) {
  return (
    <tr data-slot="table-row" className={cn(tableRowVariants({ variant }), className)} {...props} />
  );
}

const tableHeadVariants = cva(
  'text-foreground h-10 px-2 align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
  {
    variants: {
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  }
);

interface TableHeadProps
  extends Omit<React.ComponentProps<'th'>, 'align'>,
    VariantProps<typeof tableHeadVariants> {}

function TableHead({ className, align, ...props }: TableHeadProps) {
  return (
    <th data-slot="table-head" className={cn(tableHeadVariants({ align }), className)} {...props} />
  );
}

const tableCellVariants = cva(
  'p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
  {
    variants: {
      align: {
        left: 'text-left',
        center: 'text-center',
        right: 'text-right',
      },
    },
    defaultVariants: {
      align: 'left',
    },
  }
);

interface TableCellProps
  extends Omit<React.ComponentProps<'td'>, 'align'>,
    VariantProps<typeof tableCellVariants> {}

function TableCell({ className, align, ...props }: TableCellProps) {
  return (
    <td data-slot="table-cell" className={cn(tableCellVariants({ align }), className)} {...props} />
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

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  tableVariants,
  tableRowVariants,
  tableHeadVariants,
  tableCellVariants,
};
