import * as React from "react"
import { cn } from "../utils"

export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "bg-[var(--color-border-strong)]",
        orientation === "horizontal" ? "h-0.5 w-full" : "h-full w-0.5",
        className
      )}
      {...props}
    />
  )
}
