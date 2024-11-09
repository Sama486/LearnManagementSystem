"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const progressVariants = cva(
  "h-full transition-all",
  {
    variants: {
      variant: {
        default: "bg-sky-600",
        success: "bg-emerald-700",
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
)

const Progress = React.forwardRef(({ 
  className, 
  value = 0, 
  variant, 
  ...props 
}, ref) => {
  const [width, setWidth] = React.useState(0)

  React.useEffect(() => {
    // Ensure value is between 0 and 100
    const clampedValue = Math.min(Math.max(value, 0), 100)
    setWidth(clampedValue)
  }, [value])

  return (
    <div
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <div
        className={cn(progressVariants({ variant }))}
        style={{
          width: `${width}%`,
          transition: "width 0.3s ease-in-out",
        }}
      />
    </div>
  )
})

Progress.displayName = "Progress"

export { Progress }