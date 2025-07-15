import * as React from "react"
import { cn } from "@/lib/utils"

// Design system tokens for Input
const BASE = "block w-full min-h-[44px] px-4 py-3 rounded-[12px] text-[16px] font-normal bg-white border border-[#E5E7EB] placeholder-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#6366F1] focus:border-[#6366F1] transition disabled:bg-[#F1F5F9] disabled:text-[#A1A1AA] disabled:cursor-not-allowed";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(BASE, className)}
        ref={ref}
        aria-disabled={props.disabled}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
