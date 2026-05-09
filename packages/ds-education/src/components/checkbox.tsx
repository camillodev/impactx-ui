"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "../utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-[18px] w-[18px] shrink-0 rounded-[5px] border-2 border-[var(--color-border-input)]",
      "transition-all duration-150 focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-[var(--color-primary-ring)] focus-visible:ring-offset-2",
      "hover:border-[var(--color-primary)]",
      "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-[var(--color-border-input)]",
      "data-[state=checked]:bg-[var(--color-primary)]",
      "data-[state=checked]:border-[var(--color-primary)]",
      "data-[state=checked]:text-[var(--color-text-on-primary)]",
      "data-[state=indeterminate]:bg-[var(--color-primary)]",
      "data-[state=indeterminate]:border-[var(--color-primary)]",
      "data-[state=indeterminate]:text-[var(--color-text-on-primary)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-3 w-3" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))

Checkbox.displayName = "Checkbox"

export { Checkbox }
