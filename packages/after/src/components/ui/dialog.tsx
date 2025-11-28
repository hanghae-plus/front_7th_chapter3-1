import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

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
    className={cn(
      "fixed inset-0",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      zIndex: 1040,
      ...style
    }}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, style, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
        "grid w-full",
        "outline-none",
        "duration-200",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state-open]:slide-in-from-top-[48%]",
        className
      )}
      style={{
        maxWidth: '26rem',
        gap: 'var(--space-4)',
        padding: 'var(--modal-padding)',
        border: '1px solid var(--modal-border)',
        backgroundColor: 'var(--modal-bg)',
        boxShadow: 'var(--modal-shadow)',
        borderRadius: 'var(--modal-radius)',
        zIndex: 'var(--z-index-modal)',
        ...style
      }}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={cn(
          "absolute rounded-sm opacity-70",
          "transition-opacity",
          "hover:opacity-100",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "disabled:pointer-events-none"
        )}
        style={{
          right: 'var(--space-4)',
          top: 'var(--space-4)',
        }}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col",
      "text-center sm:text-left",
      className
    )}
    style={{
      gap: 'var(--space-1-5)',
      ...style
    }}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-row justify-end",
      className
    )}
    style={{
      gap: 'var(--modal-footer-gap)',
      ...style
    }}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "leading-none tracking-tight",
      className
    )}
    style={{
      fontSize: 'var(--modal-title-font-size)',
      fontWeight: 'var(--modal-title-font-weight)',
      ...style
    }}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, style, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-sm",
      className
    )}
    style={{
      color: 'var(--color-foreground-muted)',
      ...style
    }}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
