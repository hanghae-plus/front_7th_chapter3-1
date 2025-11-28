import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Card as ShadcnCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'bordered' | 'elevated' | 'flat';
  headerActions?: React.ReactNode;
}

const variantStyles = {
  default: 'border-[rgba(0,0,0,0.12)] shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)]',
  bordered: 'border-[rgba(0,0,0,0.12)] shadow-none',
  elevated: 'border-[rgba(0,0,0,0.08)] shadow-[0px_2px_4px_-1px_rgba(0,0,0,0.12),0px_1px_2px_0px_rgba(0,0,0,0.08),0px_1px_4px_0px_rgba(0,0,0,0.08)]',
  flat: 'border-[rgba(0,0,0,0.08)] bg-[#fafafa] shadow-none',
};

export const Card = ({
  children,
  title,
  subtitle,
  variant = 'default',
  headerActions,
}: CardProps) => {
  return (
    <ShadcnCard
      className={cn(
        'mb-4 rounded-md overflow-hidden bg-white',
        variantStyles[variant]
      )}
      style={{ fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif" }}
    >
      {(title || subtitle || headerActions) && (
        <CardHeader className="p-0 py-5 px-5 border-b border-[rgba(0,0,0,0.08)] bg-[#fafafa]">
          <div className="flex justify-between items-center">
            <div>
              {title && (
                <CardTitle className="m-0 text-lg font-medium leading-[1.6] text-[rgba(0,0,0,0.87)]">
                  {title}
                </CardTitle>
              )}
              {subtitle && (
                <CardDescription className="mt-1 mb-0 text-sm font-normal leading-[1.43] text-[rgba(0,0,0,0.6)]">
                  {subtitle}
                </CardDescription>
              )}
            </div>
            {headerActions && <div>{headerActions}</div>}
          </div>
        </CardHeader>
      )}
      <CardContent className="p-0 py-5 px-5">{children}</CardContent>
    </ShadcnCard>
  );
};
