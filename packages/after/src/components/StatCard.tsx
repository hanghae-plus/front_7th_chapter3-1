import { Card, type cardVariants } from './ui/card';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const valueColorMap = {
  default: 'text-foreground',
  info: 'text-blue-600 dark:text-blue-400',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-orange-600 dark:text-orange-400',
  error: 'text-red-600 dark:text-red-400',
} as const;

interface StatCardProps extends VariantProps<typeof cardVariants> {
  label: string;
  value: string | number;
  className?: string;
}

function StatCard({ variant = 'default', label, value, className }: StatCardProps) {
  return (
    <Card variant={variant} size="sm" className={cn('flex flex-col gap-1', className)}>
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className={cn('text-2xl font-bold', valueColorMap[variant ?? 'default'])}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </span>
    </Card>
  );
}

export { StatCard };
export type { StatCardProps };
