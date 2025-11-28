import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const statCardVariants = cva('rounded-sm border px-[15px] py-[12px]', {
  variants: {
    variant: {
      default: 'bg-default border-default-border',
      primary: 'bg-primary-weak border-primary-border',
      success: 'bg-success-weak border-success-border',
      warning: 'bg-warning-weak border-warning-border',
      danger: 'bg-danger-weak border-danger-border',
      info: 'bg-info-weak border-info-border',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const statCardValueVariants = cva('text-3xl font-bold', {
  variants: {
    variant: {
      default: 'text-default-foreground',
      primary: 'text-primary',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
      info: 'text-info',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export type StatCardVariant = VariantProps<typeof statCardVariants>;

// Context for variant
type StatCardContextValue = {
  variant?: StatCardVariant['variant'];
};

const StatCardContext = React.createContext<StatCardContextValue>({});

// Root component
interface StatCardProps extends React.ComponentProps<'div'>, StatCardVariant {}

function StatCard({ variant, className, children, ...props }: StatCardProps) {
  return (
    <StatCardContext.Provider value={{ variant }}>
      <div
        data-slot="stat-card"
        className={cn(statCardVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    </StatCardContext.Provider>
  );
}

// Label component
type StatCardLabelProps = React.ComponentProps<'div'>;

function StatCardLabel({ className, ...props }: StatCardLabelProps) {
  return (
    <div
      data-slot="stat-card-label"
      className={cn('caption mb-[4px]', className)}
      {...props}
    />
  );
}

// Value component
interface StatCardValueProps extends React.ComponentProps<'div'> {
  variant?: StatCardVariant['variant'];
}

function StatCardValue({ className, variant: variantProp, ...props }: StatCardValueProps) {
  const context = React.useContext(StatCardContext);
  const variant = variantProp ?? context.variant;

  return (
    <div
      data-slot="stat-card-value"
      className={cn(statCardValueVariants({ variant }), className)}
      {...props}
    />
  );
}

// Icon component (optional)
type StatCardIconProps = React.ComponentProps<'div'>;

function StatCardIcon({ className, ...props }: StatCardIconProps) {
  return (
    <div
      data-slot="stat-card-icon"
      className={cn('mb-[4px] flex items-center justify-between', className)}
      {...props}
    />
  );
}

// Trend component (optional)
interface StatCardTrendProps extends React.ComponentProps<'div'> {
  direction?: 'up' | 'down' | 'neutral';
}

function StatCardTrend({
  direction = 'neutral',
  className,
  children,
  ...props
}: StatCardTrendProps) {
  const trendColors = {
    up: 'text-success',
    down: 'text-danger',
    neutral: 'text-muted',
  };

  return (
    <div
      data-slot="stat-card-trend"
      className={cn('caption mt-[4px]', trendColors[direction], className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Description component (optional)
type StatCardDescriptionProps = React.ComponentProps<'div'>;

function StatCardDescription({ className, ...props }: StatCardDescriptionProps) {
  return (
    <div
      data-slot="stat-card-description"
      className={cn('caption mt-[4px]', className)}
      {...props}
    />
  );
}

// Compound component exports
StatCard.Label = StatCardLabel;
StatCard.Value = StatCardValue;
StatCard.Icon = StatCardIcon;
StatCard.Trend = StatCardTrend;
StatCard.Description = StatCardDescription;

export { StatCard, type StatCardProps };
