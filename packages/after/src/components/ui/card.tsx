import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const cardVariants = cva(
  // Base styles matching card from components.css
  "rounded-md mb-4 overflow-hidden bg-card font-sans",
  {
    variants: {
      variant: {
        default: "border border-[var(--border-default)] shadow-[var(--shadow-sm)]",
        bordered: "border border-[var(--border-default)] shadow-none",
        elevated: "border border-[var(--border-light)] shadow-[var(--shadow-md)]",
        flat: "border border-[var(--border-light)] shadow-none bg-background",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Card({ 
  className, 
  variant,
  ...props 
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        // Matching card-header from components.css
        "p-5 border-b border-(--border-light) flex justify-between items-center bg-background",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        // Matching card-title from components.css
        "m-0 text-lg font-medium leading-loose text-card-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        // Matching card-subtitle from components.css
        "mt-1 mb-0 text-sm font-normal leading-normal text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("ml-auto", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        // Matching card-body from components.css
        "p-5",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center p-5 border-t border-(--border-light)",
        className
      )}
      {...props}
    />
  )
}

// ✅ 편의 래퍼: organisms/Card.tsx와 호환성 유지
interface SimpleCardProps extends React.ComponentProps<"div">, VariantProps<typeof cardVariants> {
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
  children?: React.ReactNode;
}

/**
 * SimpleCard - organisms/Card.tsx와 호환되는 간단한 API
 * @example
 * <SimpleCard title="제목" subtitle="부제목" variant="elevated">
 *   내용
 * </SimpleCard>
 */
function SimpleCard({ 
  title,
  subtitle,
  headerActions,
  children,
  variant,
  className,
  ...props
}: SimpleCardProps) {
  return (
    <Card variant={variant} className={className} {...props}>
      {(title || subtitle || headerActions) && (
        <CardHeader>
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {subtitle && <CardDescription>{subtitle}</CardDescription>}
          </div>
          {headerActions && <CardAction>{headerActions}</CardAction>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
  SimpleCard,
}
