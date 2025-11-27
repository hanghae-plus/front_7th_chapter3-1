import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Table container - token 기반 스타일
const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement> & {
    striped?: boolean
    bordered?: boolean
    hover?: boolean
  }
>(({ className, striped, bordered, hover, ...props }, ref) => (
  <div className="overflow-x-auto">
    <table
      ref={ref}
      className={cn(
        // token 폴더의 토큰 기반 table 베이스 스타일
        "w-full border-collapse font-[var(--font-family-alt)] text-[length:var(--font-size-table-body)] bg-[var(--color-white)]",
        className
      )}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

// TableHeader - token 기반 스타일
const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn("bg-[var(--color-bg-table-header)]", className)}
    {...props}
  />
))
TableHeader.displayName = "TableHeader"

// TableBody - token 기반 스타일
const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement> & {
    striped?: boolean
    hover?: boolean
  }
>(({ className, striped, hover, ...props }, ref) => {
  const bodyVariants = cva("", {
    variants: {
      striped: {
        true: "[&_tr:nth-child(even)]:bg-[var(--color-bg-table-striped)]",
      },
      hover: {
        true: "[&_tr:hover]:bg-[var(--color-bg-table-hover)]",
      },
    },
  })

  return (
  <tbody
    ref={ref}
      className={cn(
        bodyVariants({ striped, hover }),
        "[&_tr:last-child_td]:border-0",
        className
      )}
    {...props}
  />
  )
})
TableBody.displayName = "TableBody"

// TableFooter - token 기반 스타일
const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t border-[var(--color-border-table-cell)] bg-[var(--color-bg-table-striped)] font-[var(--font-weight-medium)] [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

// TableRow - token 기반 스타일
const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    bordered?: boolean
  }
>(({ className, bordered, ...props }, ref) => {
  const rowVariants = cva("", {
    variants: {
      bordered: {
        true: "border border-[var(--color-border-table-cell)]",
      },
    },
  })

  return (
  <tr
    ref={ref}
    className={cn(
        "border-b border-[var(--color-border-table-cell)]",
        rowVariants({ bordered }),
      className
    )}
    {...props}
  />
  )
})
TableRow.displayName = "TableRow"

// TableHead - token 기반 스타일
const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & {
    bordered?: boolean
  }
>(({ className, bordered, ...props }, ref) => {
  const headVariants = cva("", {
    variants: {
      bordered: {
        true: "border border-[var(--color-border-table-header)]",
      },
    },
  })

  return (
  <th
    ref={ref}
    className={cn(
        // token 폴더의 토큰 기반 th 스타일
        "p-[var(--space-table-cell-padding)] text-left align-middle font-[var(--font-weight-medium)] text-[length:var(--font-size-table-heading)] text-[var(--color-text-table-header)] uppercase tracking-[var(--letter-spacing-table)] border-b-[2px] border-[var(--color-border-table-header)]",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        headVariants({ bordered }),
      className
    )}
    {...props}
  />
  )
})
TableHead.displayName = "TableHead"

// TableCell - token 기반 스타일
const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    bordered?: boolean
  }
>(({ className, bordered, ...props }, ref) => {
  const cellVariants = cva("", {
    variants: {
      bordered: {
        true: "border border-[var(--color-border-table-cell)]",
      },
    },
  })

  return (
  <td
    ref={ref}
    className={cn(
        // token 폴더의 토큰 기반 td 스타일
        "p-[var(--space-table-cell-padding)] align-middle text-[var(--color-text-table-body)] border-b border-[var(--color-border-table-cell)]",
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        cellVariants({ bordered }),
      className
    )}
    {...props}
  />
  )
})
TableCell.displayName = "TableCell"

// TableCaption - token 기반 스타일
const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-4 text-[length:var(--font-size-table-body)] text-[var(--color-text-muted)]",
      className
    )}
    {...props}
  />
))
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
