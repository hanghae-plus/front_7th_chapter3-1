import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={className}
    style={{
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '2.5rem',
      padding: '0 0.75rem',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: 'var(--color-border)',
      borderRadius: '0.375rem',
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-foreground)',
      cursor: 'pointer',
    }}
    {...props}
  >
    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
      {children}
    </span>
    <SelectPrimitive.Icon asChild>
      <ChevronDown style={{ width: '1rem', height: '1rem', opacity: 0.5, flexShrink: 0, marginLeft: '0.5rem' }} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={className}
      position={position}
      style={{
        position: 'relative',
        zIndex: 9999,
        maxHeight: '24rem',
        minWidth: '8rem',
        overflow: 'hidden',
        borderRadius: '0.5rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-background)',
        color: 'var(--color-foreground)',
        boxShadow: 'var(--shadow-dropdown)',
        ...(position === "popper" && { marginTop: '0.25rem' }),
      }}
      {...props}
    >
      <SelectPrimitive.Viewport
        className={cn(
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
        style={{
          padding: '0.25rem',
        }}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={className}
    style={{
      padding: '0.375rem 2rem 0.375rem 0.5rem',
      fontSize: '0.875rem',
      fontWeight: 600,
    }}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={className}
    style={{
      position: 'relative',
      display: 'flex',
      width: '100%',
      cursor: 'pointer',
      userSelect: 'none',
      alignItems: 'center',
      borderRadius: '0.125rem',
      padding: '0.375rem 2rem 0.375rem 2rem',
      fontSize: '0.875rem',
      outline: 'none',
    }}
    {...props}
  >
    <span style={{ position: 'absolute', left: '0.5rem', display: 'flex', height: '0.875rem', width: '0.875rem', alignItems: 'center', justifyContent: 'center' }}>
      <SelectPrimitive.ItemIndicator>
        <Check style={{ width: '1rem', height: '1rem' }} />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={className}
    style={{
      margin: '0.25rem -0.25rem',
      height: '1px',
      backgroundColor: 'var(--color-border)',
    }}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

const SelectScrollUpButton = SelectPrimitive.ScrollUpButton
const SelectScrollDownButton = SelectPrimitive.ScrollDownButton

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}
