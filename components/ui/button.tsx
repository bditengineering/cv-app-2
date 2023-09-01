import React from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "button rounded-lg flex items-center gap-x-2 font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: [
          "shadow-sm bg-primary-light text-white focus:ring-4 focus:ring-indigo-100",
          "hover:bg-sky-600",
          "disabled:hover:cursor-not-allowed",
        ],
        tinted: [
          "bg-indigo-50 text-primary-light focus:ring-4 focus:ring-indigo-100",
          "hover:bg-indigo-100 hover:text-indigo-800",
          // when button is disabled, we dont't want to change background and font color
          // hence we're reverting it to the same values that non-hovered button have
          "disabled:hover:bg-indigo-50 disabled:hover:text-primary-light",
        ],
        outlined: [
          "shadow-sm border border-gray-300 bg-white text-gray-700 focus:ring-4 focus:ring-gray-100",
          "hover:bg-gray-50 hover:text-gray-800",
          "disabled:hover:bg-white disabled:hover:text-gray-700",
        ],
        plain: [
          "text-gray-600 focus:bg-gray-50 hover:text-gray-700",
          "hover:bg-gray-50 hover:text-gray-700",
          "disabled:hover:bg-transparent disabled:hover:text-gray-600",
        ],
      },
      size: {
        small: "py-2 px-3.5 text-sm",
        medium: "py-2.5 px-4 text-sm",
        large: "py-3 px-5 text-base",
      },
      disabled: {
        true: "opacity-50 pointer-events-none",
      },
      fullWidth: {
        true: "w-full justify-center",
      },
    },
    defaultVariants: {
      disabled: false,
      fullWidth: false,
      size: "medium",
      variant: "default",
    },
  }
);

interface ButtonProps
  extends Omit<
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >,
      "prefix" | "disabled"
    >,
    VariantProps<typeof buttonVariants> {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Button = React.forwardRef(
  (
    {
      children,
      className,
      disabled,
      fullWidth,
      onClick,
      prefix,
      size,
      suffix,
      type = "button",
      variant,
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({
            className,
            disabled,
            fullWidth,
            size,
            variant,
          })
        )}
        disabled={!!disabled}
        onClick={onClick}
        type={type}
        ref={ref}
      >
        {prefix}
        {children}
        {suffix}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
