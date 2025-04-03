"use client"

import { useState } from "react"
import { Check } from "lucide-react"

export default function ColorSelector({ colors }) {
  const [selectedColor, setSelectedColor] = useState(colors[0].id)

  return (
    <div className="cyber-box p-4">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-primary mr-2"></div>
          <h3 className="text-sm uppercase tracking-wider text-primary">COLOR_SELECT</h3>
        </div>
        <span className="text-xs text-muted-foreground border border-primary/30 px-2 py-1">
          {colors.find((c) => c.id === selectedColor)?.name.toUpperCase()}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.id}
            className={`
              w-10 h-10 flex items-center justify-center transition-all
              ${
                selectedColor === color.id
                  ? "border-2 border-primary"
                  : "border border-primary/30 hover:border-primary/60"
              }
            `}
            style={{ backgroundColor: color.hex }}
            onClick={() => setSelectedColor(color.id)}
            aria-label={`Select ${color.name} color`}
          >
            {selectedColor === color.id && (
              <Check className={`h-5 w-5 ${isLightColor(color.hex) ? "text-black" : "text-white"}`} />
            )}
          </button>
        ))}
      </div>

      <div className="mt-3 text-xs text-muted-foreground border-t border-primary/20 pt-2">
        <span className="text-primary">SYS:</span> COLOR_CALIBRATION_ACTIVE
      </div>
    </div>
  )
}

// Helper function to determine if a color is light or dark
function isLightColor(hex) {
  // Convert hex to RGB
  const r = Number.parseInt(hex.slice(1, 3), 16)
  const g = Number.parseInt(hex.slice(3, 5), 16)
  const b = Number.parseInt(hex.slice(5, 7), 16)

  // Calculate brightness (HSP)
  const brightness = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))

  return brightness > 127.5
}

