import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const tableVariants = cva("w-full caption-bottom", {
  variants: {
    size: {
      default: "text-[var(--font-size-md)]",
      sm: "text-[var(--font-size-sm)]",
      lg: "text-[var(--font-size-lg)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface TableProps
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, size, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table
        ref={ref}
        className={cn(tableVariants({ size }), className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const tableHeadVariants = cva(
  "text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
  {
    variants: {
      size: {
        default: "h-12 px-4 text-[var(--font-size-md)]",
        sm: "h-10 px-3 text-[var(--font-size-sm)]",
        lg: "h-14 px-6 text-[var(--font-size-lg)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableHeadVariants> {}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, size, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(tableHeadVariants({ size }), className)}
      {...props}
    />
  )
);
TableHead.displayName = "TableHead";

const tableCellVariants = cva("align-middle [&:has([role=checkbox])]:pr-0", {
  variants: {
    size: {
      default: "p-4 text-[var(--font-size-md)]",
      sm: "p-3 text-[var(--font-size-sm)]",
      lg: "p-6 text-[var(--font-size-lg)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableCellVariants> {}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, size, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(tableCellVariants({ size }), className)}
      {...props}
    />
  )
);
TableCell.displayName = "TableCell";

const tableCaptionVariants = cva("mt-4 text-muted-foreground", {
  variants: {
    size: {
      default: "text-[var(--font-size-md)]",
      sm: "text-[var(--font-size-sm)]",
      lg: "text-[var(--font-size-lg)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement>,
    VariantProps<typeof tableCaptionVariants> {}

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, size, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(tableCaptionVariants({ size }), className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

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
  tableHeadVariants,
  tableCellVariants,
  tableCaptionVariants,
};
