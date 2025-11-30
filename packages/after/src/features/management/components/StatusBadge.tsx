import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
  {
    variants: {
      tone: {
        primary:
          "bg-[color:var(--ds-color-brand-primary-50)] text-[color:var(--ds-color-brand-primary-600)]",
        success:
          "bg-[color:var(--ds-color-feedback-success-50)] text-[color:var(--ds-color-feedback-success-600)]",
        warning:
          "bg-[color:var(--ds-color-feedback-warning-50)] text-[color:var(--ds-color-feedback-warning-600)]",
        danger:
          "bg-[color:var(--ds-color-feedback-danger-50)] text-[color:var(--ds-color-feedback-danger-600)]",
        neutral:
          "bg-[color:var(--ds-color-neutral-100)] text-[color:var(--ds-color-text-secondary)]",
      },
    },
    defaultVariants: {
      tone: "neutral",
    },
  },
);

export type StatusBadgeTone = NonNullable<VariantProps<typeof badgeVariants>["tone"]>;

interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
  label: string;
}

export const StatusBadge = ({ label, tone }: StatusBadgeProps) => {
  return <span className={badgeVariants({ tone })}>{label}</span>;
};

