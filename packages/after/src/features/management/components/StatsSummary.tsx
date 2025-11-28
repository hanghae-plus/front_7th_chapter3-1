import React from "react";
import { cn } from "@/lib/utils";

type StatVariant = "default" | "success" | "warning" | "error" | "info" | "neutral";

type StatItem = { 
  label: string; 
  value: number | string;
  variant?: StatVariant;
};

type StatsSummaryProps = { 
  items: StatItem[] 
};

const variantStyles: Record<StatVariant, string> = {
  default: "bg-[var(--color-background-subtle)] border-[var(--color-border)] text-[var(--color-foreground)]",
  success: "bg-[var(--color-success-light)] border-[var(--color-success-border)] text-[var(--color-success)]",
  warning: "bg-[var(--color-warning-light)] border-[var(--color-warning-border)] text-[var(--color-warning)]",
  error: "bg-[var(--color-danger-light)] border-[var(--color-danger-border)] text-[var(--color-danger)]",
  info: "bg-[var(--color-info-light)] border-[var(--color-info-border)] text-[var(--color-info)]",
  neutral: "bg-[var(--color-slate-100)] border-[var(--color-slate-300)] text-[var(--color-slate-700)]",
};

export const StatsSummary: React.FC<StatsSummaryProps> = ({ items }) => {
  return (
    <div className="grid gap-[var(--spacing-component-md)] grid-cols-5">
      {items.map((item, index) => {
        const variant = item.variant || "default";
        
        return (
          <div 
            key={`${item.label}-${index}`}
            className={cn(
              "rounded-[var(--card-radius)] border",
              "p-[var(--spacing-component-md)]",
              "transition-colors",
              variantStyles[variant]
            )}
          >
            <div 
              className="text-[var(--font-size-xs)] text-[var(--color-foreground-muted)]"
              style={{ marginBottom: 'var(--space-1)' }}
            >
              {item.label}
            </div>
            <div style={{ 
              fontSize: 'var(--font-size-lg)', 
              fontWeight: 'var(--font-weight-bold)' 
            }}>
              {typeof item.value === 'number' 
                ? item.value.toLocaleString() 
                : item.value
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};
