import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

const statsCardVariants = cva("stats-card", {
  variants: {
    variant: {
      default: "",
      bordered: "border-primary/40 bg-primary/5",
      elevated: "shadow-md",
      flat: "border-none shadow-none bg-transparent",
    },
    color: {
      primary: "border-primary border-1 bg-primary-foreground text-primary",
      green: "border-success border-1 bg-success-foreground text-success",
      orange: "border-warning border-1 bg-warning-foreground text-warning",
      red: "border-error border-1 bg-error-foreground text-error",
      neutral: "border-neutral border-1 bg-neutral-foreground text-neutral",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "primary",
  },
});

interface StatsCardProps extends VariantProps<typeof statsCardVariants> {
  title?: string;
  subtitle?: string;
  className?: string;
  color?: "primary" | "green" | "orange" | "red" | "neutral";
}

const StatsCard: React.FC<StatsCardProps> = ({ title, subtitle, variant, className, color }) => {
  return (
    <Card className={cn(statsCardVariants({ variant, color }), className)}>
      <CardHeader>{title && <CardTitle className="text-base">{title}</CardTitle>}</CardHeader>
      <CardContent className="text-2xl font-bold">{subtitle}</CardContent>
    </Card>
  );
};

export default StatsCard;
