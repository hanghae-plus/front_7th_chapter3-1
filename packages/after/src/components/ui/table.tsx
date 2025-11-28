import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom",
        "border-collapse",
        "text-[var(--table-cell-font-size)]",
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "bg-[var(--table-header-bg)]",
      "[&_tr]:border-b [&_tr]:border-[var(--table-border)]",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "[&_tr:last-child]:border-0",
      className
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-[var(--table-border)]",
      "bg-[var(--table-header-bg)]",
      "font-[var(--table-header-font-weight)]",
      "[&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-[var(--table-row-border)]",
      "transition-colors",
      "hover:bg-[var(--table-row-hover-bg)]",
      "data-[state=selected]:bg-[var(--table-row-hover-bg)]",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, style, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "table-head",
      "text-left align-middle",
      "[&:has([role=checkbox])]:pr-0",
      "[&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    style={{
      paddingTop: 'var(--space-3)',
      paddingBottom: 'var(--space-3)',
      paddingLeft: 'var(--space-4)',
      paddingRight: 'var(--space-4)',
      ...style
    }}
    {...props}
  />
));
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, style, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "table-cell",
      "align-middle",
      "[&:has([role=checkbox])]:pr-0",
      "[&>[role=checkbox]]:translate-y-[2px]",
      className
    )}
    style={{
      paddingTop: 'var(--space-3)',
      paddingBottom: 'var(--space-3)',
      paddingLeft: 'var(--space-4)',
      paddingRight: 'var(--space-4)',
      ...style
    }}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-[var(--spacing-component-md)]",
      "text-[var(--font-size-sm)]",
      "text-[var(--color-foreground-muted)]",
      className
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
