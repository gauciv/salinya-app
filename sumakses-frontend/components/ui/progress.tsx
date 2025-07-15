"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

// Progress bar using design system tokens
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 0, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn("relative h-[6px] w-full overflow-hidden rounded-[4px] bg-[#E5E7EB]", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full bg-[#6366F1] transition-all duration-200"
      style={{ width: `${value}%` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
