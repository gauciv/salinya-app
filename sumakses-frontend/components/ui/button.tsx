import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

// Design system tokens
const BASE = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] font-semibold leading-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2 shadow-sm disabled:opacity-50 disabled:pointer-events-none select-none";

const VARIANTS = {
  primary: "bg-[#6366F1] text-white hover:bg-[#4F46E5] active:bg-[#4338CA]",
  secondary: "bg-[#FDE68A] text-[#18181B] hover:bg-[#F59E42] active:bg-[#F59E42]",
  outline: "bg-white border border-[#E5E7EB] text-[#6366F1] hover:bg-[#F1F5F9] active:bg-[#E0E7FF]",
  ghost: "bg-transparent text-[#6366F1] hover:bg-[#F1F5F9] active:bg-[#E0E7FF]",
  link: "bg-transparent text-[#6366F1] underline underline-offset-4 hover:text-[#4F46E5]"
};

const SIZES = {
  default: "min-h-[44px] px-6 py-4 text-[16px]",
  sm: "min-h-[36px] px-4 py-2 text-[14px]",
  icon: "min-h-[44px] min-w-[44px] p-0"
};

const buttonVariants = ({ variant, size }: { variant?: keyof typeof VARIANTS; size?: keyof typeof SIZES } = {}) => {
  return cn(BASE, VARIANTS[variant || "primary"], SIZES[size || "default"])
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANTS;
  size?: keyof typeof SIZES;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          BASE,
          VARIANTS[variant],
          SIZES[size],
          className
        )}
        ref={ref}
        aria-disabled={props.disabled}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants }
