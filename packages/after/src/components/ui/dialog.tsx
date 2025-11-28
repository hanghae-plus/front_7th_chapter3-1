import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-[var(--z-index-modal)] bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const dialogContentVariants = cva(
  "fixed left-[50%] top-[50%] z-[var(--z-index-modal)] grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background shadow-[var(--shadow-modal)] duration-[var(--duration-slow)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
  {
    variants: {
      size: {
        default:
          "max-w-[var(--max-width-modal-medium)] p-[var(--spacing-modal-body)]",
        sm: "max-w-[var(--max-width-modal-small)] p-[var(--spacing-modal-body)]",
        lg: "max-w-[var(--max-width-modal-large)] p-[var(--spacing-modal-body)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, children, size, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(dialogContentVariants({ size }), className)}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <svg
          className="h-[var(--height-modal-close)] w-[var(--height-modal-close)]"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const dialogHeaderVariants = cva("flex flex-col space-y-1.5", {
  variants: {
    size: {
      default: "p-[var(--spacing-modal-header)] text-center sm:text-left",
      sm: "p-3 text-center sm:text-left",
      lg: "p-6 text-center sm:text-left",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface DialogHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogHeaderVariants> {}

const DialogHeader = ({ className, size, ...props }: DialogHeaderProps) => (
  <div className={cn(dialogHeaderVariants({ size }), className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const dialogFooterVariants = cva(
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
  {
    variants: {
      size: {
        default: "p-[var(--spacing-modal-footer)]",
        sm: "p-3",
        lg: "p-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface DialogFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof dialogFooterVariants> {}

const DialogFooter = ({ className, size, ...props }: DialogFooterProps) => (
  <div className={cn(dialogFooterVariants({ size }), className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const dialogTitleVariants = cva("font-semibold leading-none tracking-tight", {
  variants: {
    size: {
      default: "text-[var(--font-size-lg)]",
      sm: "text-[var(--font-size-md)]",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface DialogTitleProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>,
    VariantProps<typeof dialogTitleVariants> {}

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  DialogTitleProps
>(({ className, size, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(dialogTitleVariants({ size }), className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const dialogDescriptionVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      default: "text-[var(--font-size-md)]",
      sm: "text-[var(--font-size-sm)]",
      lg: "text-[var(--font-size-lg)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface DialogDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>,
    VariantProps<typeof dialogDescriptionVariants> {}

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  DialogDescriptionProps
>(({ className, size, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(dialogDescriptionVariants({ size }), className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogContentVariants,
  dialogHeaderVariants,
  dialogFooterVariants,
  dialogTitleVariants,
  dialogDescriptionVariants,
};
