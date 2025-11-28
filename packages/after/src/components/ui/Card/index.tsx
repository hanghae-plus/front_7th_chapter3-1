import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import { cardVariants } from './styles';
import type { CardRootProps } from './types';

const CardRoot = forwardRef<HTMLDivElement, CardRootProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
);

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'p-(--spacing-lg) border-b border-(--color-border-light) flex justify-between items-center bg-(--color-bg-secondary)',
      className
    )}
    {...props}
  />
));

const CardTitle = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'm-0 text-(length:--font-size-xl) font-medium leading-(--line-height-relaxed) text-(--color-text-primary)',
      className
    )}
    {...props}
  />
));

const CardDescription = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'mt-(--spacing-xs) mb-0 text-(length:--font-size-base) font-normal leading-(--line-height-snug) text-(--color-text-secondary)',
      className
    )}
    {...props}
  />
));

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-(--spacing-lg)', className)} {...props} />
));

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
));

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});
