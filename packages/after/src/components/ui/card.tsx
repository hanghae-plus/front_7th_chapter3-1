import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "bg-app-card text-app-card-foreground rounded-xl border py-3 px-[15px] shadow-sm",
  {
    variants: {
      variant: {
        success:
          "bg-alert-success text-success-alert-foreground border-alert-success-border [--card-title-color:var(--color-card-title-success)]",
        danger:
          "bg-alert-danger text-danger-alert-foreground border-alert-danger-border [--card-title-color:var(--color-card-title-danger)]",
        warning:
          "bg-alert-warning text-warning-alert-foreground border-alert-warning-border [--card-title-color:var(--color-card-title-warning)]",
        info: "bg-alert-info text-info-alert-foreground border-alert-info-border [--card-title-color:var(--color-card-title-info)]",
        muted:
          "bg-alert-muted text-muted-alert-foreground border-alert-muted-border [--card-title-color:var(--color-card-title-muted)]",
      },
    },
    defaultVariants: {
      variant: "success",
    },
  }
);

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("has-data-[slot=card-action] [.border-b]:pb-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-none font-bold text-2xl",
        "[color:var(--card-title-color,var(--color-app-card-foreground))]",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-sm",
        "[color:var(--color-app-text-tertiary)]",
        className
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
