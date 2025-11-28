import * as React from 'react';

import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva('mb-md font-roboto overflow-hidden rounded-md bg-background', {
  variants: {
    variant: {
      default: 'border border-border shadow-sm',
      bordered: 'border border-border shadow-none',
      elevated: 'border border-border-subtle shadow-md',
      flat: 'bg-elevated border border-border-subtle shadow-none',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type CardVariant = VariantProps<typeof cardVariants>;

function Card({ className, variant, ...props }: React.ComponentProps<'div'> & CardVariant) {
  return <div data-slot="card" className={cn(cardVariants({ variant, className }))} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        'p-lg bg-elevated flex items-center justify-between border-b border-border-subtle',
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('h6 m-0', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        'body-base text-medium mx-0 mt-1 mb-0',
        className
      )}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-action" className={cn('', className)} {...props} />;
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('p-lg', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-footer" className={cn('', className)} {...props} />;
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
