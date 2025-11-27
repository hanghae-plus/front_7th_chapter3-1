import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000,
      ...style,
    }}
    className={cn(
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

type DialogContentProps = React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
  size?: "small" | "medium" | "large"
}

const sizeClasses: Record<NonNullable<DialogContentProps["size"]>, string> = {
  small: "max-w-[var(--size-modal-width-sm)]",
  medium: "max-w-[var(--size-modal-width-md)]",
  large: "max-w-[var(--size-modal-width-lg)]",
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, size = "medium", ...props }, ref) => {
  const { ["aria-describedby"]: ariaDescribedBy, ...rest } = props

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        {...rest}
        aria-describedby={ariaDescribedBy ?? undefined}
        style={{
          zIndex: 1001,
        }}
        className={cn(
      "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
      "mx-(--spacing-4)",
          "bg-(--color-bg-modal) text-(--color-text-default) rounded-(--radius-4)",
          "shadow-(--shadow-modal) max-h-[90vh] w-full flex flex-col overflow-hidden",
          "font-(--font-family-alt) border border-(--color-border-card)",
          "box-border",
          "p-0",
          sizeClasses[size],
          className
        )}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
})
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "px-(--space-modal-padding-inline) py-(--space-modal-padding-block) border-b border-(--color-border-card-header) flex items-center justify-between gap-(--space-modal-footer-gap)",
      className
    )}
    {...props}
  />
)

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-(length:--font-size-heading-md) font-medium text-(--color-text-modal-title)", className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = DialogPrimitive.Description

const DialogBody = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("p-(--space-modal-body-padding) overflow-y-auto flex-1 text-(--color-text-default) bg-(--color-bg-modal)", className)}
    {...props}
  />
)

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "px-(--space-modal-padding-inline) py-(--space-modal-padding-block) border-t border-(--color-border-card-header) flex justify-end gap-(--space-modal-footer-gap) bg-(--color-bg-modal)",
      className
    )}
    {...props}
  />
)

const DialogCloseButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <DialogClose
    className={cn(
      "text-(--color-icon-secondary) transition-colors duration-150",
      "bg-transparent hover:bg-(--color-bg-modal-close-hover)",
      "border-0 text-[28px] leading-none w-(--size-modal-close) h-(--size-modal-close) flex items-center justify-center rounded-full",
      className
    )}
    {...props}
  >
    ×
  </DialogClose>
)

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogCloseButton,
}

