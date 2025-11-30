import { cn } from "@/lib/utils";
import { entityCopy } from "../constants";
import type { EntityType, StatMetric } from "../types";

interface EntityStatsProps {
  title: string;
  description?: string;
  metrics: StatMetric[];
  entityType: EntityType;
  onEntityChange: (next: EntityType) => void;
  className?: string;
}

type ToneKey = NonNullable<StatMetric["tone"]>;

const toneStyles: Record<ToneKey, { container: string; value: string }> = {
  default: {
    container:
      "bg-[color:var(--ds-color-brand-primary-50)] border-[color:var(--ds-color-brand-primary-200)]",
    value: "text-[color:var(--ds-color-brand-primary-500)]",
  },
  success: {
    container:
      "bg-[color:var(--ds-color-feedback-success-50)] border-[color:var(--ds-color-feedback-success-200)]",
    value: "text-[color:var(--ds-color-feedback-success-500)]",
  },
  warning: {
    container:
      "bg-[color:var(--ds-color-feedback-warning-50)] border-[color:var(--ds-color-feedback-warning-200)]",
    value: "text-[color:var(--ds-color-feedback-warning-500)]",
  },
  danger: {
    container:
      "bg-[color:var(--ds-color-feedback-danger-50)] border-[color:var(--ds-color-feedback-danger-200)]",
    value: "text-[color:var(--ds-color-feedback-danger-500)]",
  },
  muted: {
    container:
      "bg-[color:var(--ds-color-neutral-100)] border-[color:var(--ds-color-neutral-300)]",
    value: "text-[color:var(--ds-color-text-secondary)]",
  },
};

const toggleOptions: { value: EntityType; label: string }[] = [
  { value: "post", label: entityCopy.post.label },
  { value: "user", label: entityCopy.user.label },
];

export const EntityStats = ({
  title,
  description = "",
  metrics,
  entityType,
  onEntityChange,
  className,
}: EntityStatsProps) => {
  if (!metrics.length) return null;

  return (
    <section className={cn("space-y-4", className)}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-lg font-bold text-[color:var(--ds-color-text-primary)]">{title}</p>
          {description && (
            <p className="text-sm text-[color:var(--ds-color-text-muted)]">{description}</p>
          )}
        </div>
        <div className="flex rounded-[3px] border border-[color:var(--ds-color-neutral-300)] bg-[color:var(--ds-color-neutral-100)] p-1">
          {toggleOptions.map((option) => {
            const isActive = option.value === entityType;
            return (
              <button
                key={option.value}
                type="button"
                className={cn(
                  "min-w-[96px] rounded-[3px] px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "bg-[color:var(--ds-color-brand-primary-500)] text-[color:var(--ds-color-text-inverse)] shadow-sm"
                    : "text-[color:var(--ds-color-text-primary)]",
                )}
                onClick={() => {
                  if (isActive) return;
                  onEntityChange(option.value);
                }}
                aria-pressed={isActive}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric, index) => {
          const tone = toneStyles[metric.tone ?? "default"];
          return (
            <div
              key={`${metric.label}-${index}`}
              className={cn("rounded-[3px] border px-4 py-3", tone.container)}
            >
              <p className="text-xs font-medium uppercase tracking-wide text-[color:var(--ds-color-text-muted)]">
                {metric.label}
              </p>
              <p
                className={cn(
                  "mt-1 text-2xl font-bold leading-none",
                  tone.value,
                )}
              >
                {metric.value.toLocaleString()}
              </p>
              {metric.helper && (
                <p className="mt-1 text-xs text-[color:var(--ds-color-text-muted)]">{metric.helper}</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

