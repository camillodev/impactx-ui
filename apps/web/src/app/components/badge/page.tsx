import { Badge } from "@impactx/ds-education"
import { Check, AlertTriangle, X, Info, Star } from "lucide-react"

const variants = [
  { key: "primary", label: "Primary",  icon: <Info size={12} /> },
  { key: "success", label: "Success",  icon: <Check size={12} /> },
  { key: "ink",     label: "Ink",      icon: <Star size={12} /> },
  { key: "warning", label: "Warning",  icon: <AlertTriangle size={12} /> },
  { key: "danger",  label: "Danger",   icon: <X size={12} /> },
] as const

const sizes = [
  { key: "sm", label: "Small"  },
  { key: "md", label: "Medium" },
  { key: "lg", label: "Large"  },
] as const

const modifiers = [
  { key: "text",      label: "Text only"  },
  { key: "icon-left", label: "Icon left"  },
  { key: "icon-only", label: "Icon only"  },
] as const

export default function BadgePage() {
  return (
    <main className="min-h-screen bg-[#f7f7f7] p-10">
      <h1 className="text-2xl font-semibold text-[#1e2124] mb-8">Badge</h1>

      {variants.map(({ key: variant, label: variantLabel, icon }) => (
        <section key={variant} className="mb-10">
          <h2 className="text-sm font-medium text-[#1e2124] mb-4 uppercase tracking-wide">
            {variantLabel}
          </h2>

          <div className="grid grid-cols-3 gap-6">
            {sizes.map(({ key: size, label: sizeLabel }) => (
              <div key={size} className="flex flex-col gap-3">
                <p className="text-xs text-[#6b7280] mb-1">{sizeLabel}</p>

                {modifiers.map(({ key: modifier, label: modLabel }) => (
                  <div key={modifier} className="flex flex-col gap-1">
                    <span className="text-[10px] text-[#9ca3af]">{modLabel}</span>
                    <Badge
                      variant={variant}
                      size={size}
                      icon={modifier !== "text" ? icon : undefined}
                      iconOnly={modifier === "icon-only"}
                    >
                      {modifier !== "icon-only"
                        ? `${variantLabel} ${sizeLabel}`
                        : null}
                    </Badge>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
