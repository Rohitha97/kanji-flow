import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theme?: "light" | "dark";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, theme = "light", ...props }, ref) => {
  const boxShadowColor = theme === "dark" ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.25)";

  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2  disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
      style={{ boxShadow: `0px 4px 10px ${boxShadowColor}` }}
    />
  );
});
Input.displayName = "Input";

export { Input };
