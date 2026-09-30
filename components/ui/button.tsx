
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline" | "danger" | "soft";
  size?: "sm" | "md" | "lg";
}

const variants: Record<string, string> = {
  primary: "bg-cyan-500 text-polar-950 hover:bg-cyan-400 font-semibold",
  ghost: "glass hover:border-cyan-400/50 text-primary",
  outline: "border border-line text-primary hover:border-cyan-400/60 hover:text-accent",
  danger: "bg-rose-600/90 text-white hover:bg-rose-500 font-semibold",
  soft: "bg-cyan-500/10 text-accent hover:bg-cyan-500/20 border border-cyan-500/30",
};

const sizes: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs rounded-md gap-1.5",
  md: "px-4 py-2 text-sm rounded-lg gap-2",
  lg: "px-6 py-3 text-base rounded-xl gap-2",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center transition-all duration-150 focus-ring disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
export default Button;
