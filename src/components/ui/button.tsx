import * as React from "react"
import { motion, HTMLMotionProps } from "motion/react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'default' | 'outline' | 'ghost' | 'glow';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/50 disabled:pointer-events-none disabled:opacity-50",
          {
            'bg-white text-black hover:bg-neutral-200': variant === 'default',
            'border border-white/10 bg-black/50 backdrop-blur-sm hover:bg-white/5 text-white shadow-sm': variant === 'outline',
            'hover:bg-white/10 text-white': variant === 'ghost',
            'bg-neutral-900 text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]': variant === 'glow',
            'h-10 px-4 py-2': size === 'default',
            'h-8 rounded-lg px-3 text-xs': size === 'sm',
            'h-12 rounded-2xl px-8 text-base': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
