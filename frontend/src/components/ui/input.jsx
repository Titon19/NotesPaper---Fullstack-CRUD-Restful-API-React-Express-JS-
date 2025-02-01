import * as React from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, type, name, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col mt-4 w-full md:w-3/4 gap-2">
        <div className="ms-2">
          <Label htmlFor={name}>{label}</Label>
        </div>
        <input
          type={type}
          className={cn(
            "flex h-9 w-full md:w-3/4 rounded-xl border border-neutral-200 bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
            className
          )}
          ref={ref}
          {...props}
          name={name}
          id={name}
        />
        {error && <span className="text-red-500">{error}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
