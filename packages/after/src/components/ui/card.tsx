import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-lg border bg-card text-card-foreground", {
  variants: {
    variant: {
      default: "shadow-sm",
      elevated: "shadow-[var(--shadow-card-elevated)]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

const cardHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    size: {
      default: "p-[var(--spacing-card-header)]",
      sm: "p-[var(--spacing-card-body)]",
      lg: "p-[var(--spacing-card-header)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ size }), className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const cardTitleVariants = cva("font-semibold leading-none tracking-tight", {
  variants: {
    size: {
      default: "text-[var(--font-size-4xl)]",
      sm: "text-[var(--font-size-lg)]",
      lg: "text-[var(--font-size-4xl)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardTitleVariants> {}

const CardTitle = React.forwardRef<HTMLDivElement, CardTitleProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardTitleVariants({ size }), className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const cardDescriptionVariants = cva("text-muted-foreground", {
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

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardDescriptionVariants> {}

const CardDescription = React.forwardRef<HTMLDivElement, CardDescriptionProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardDescriptionVariants({ size }), className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const cardContentVariants = cva("pt-0", {
  variants: {
    size: {
      default: "p-[var(--spacing-card-body)]",
      sm: "p-[var(--spacing-card-body)]",
      lg: "p-[var(--spacing-card-body)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ size }), className)}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

const cardFooterVariants = cva("flex items-center pt-0", {
  variants: {
    size: {
      default: "p-[var(--spacing-card-body)]",
      sm: "p-[var(--spacing-card-body)]",
      lg: "p-[var(--spacing-card-body)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, size, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ size }), className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
