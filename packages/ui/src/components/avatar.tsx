import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../utils"

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden select-none",
  {
    variants: {
      size: {
        sm: "h-6 w-6 text-[10px]",
        md: "h-8 w-8 text-xs",
        lg: "h-10 w-10 text-sm",
        xl: "h-14 w-14 text-base",
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-lg",
      },
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
    },
  }
)

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {
  src?: string
  alt?: string
  fallback?: string
}

function getInitials(value?: string) {
  if (!value) return "?"
  const parts = value.trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ""
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? "" : ""
  return (first + last).toUpperCase() || "?"
}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, shape, src, alt, fallback, ...props }, ref) => {
  const initials = getInitials(fallback ?? alt)
  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(avatarVariants({ size, shape }), className)}
      {...props}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt ?? ""}
          className="aspect-square h-full w-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback
        delayMs={src ? 200 : 0}
        className="flex h-full w-full items-center justify-center bg-[var(--color-primary-soft)] font-semibold text-[var(--color-primary)]"
      >
        {initials}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  )
})
Avatar.displayName = "Avatar"
