"use client";

import React, { useRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

export interface PrefixSuffixRenderProps {
  disabled?: boolean;
}

const inputContainerClasses = cva("relative rounded-md", {
  variants: {
    fullWidth: {
      true: "w-full",
    },
    disabled: {
      true: "bg-gray-50 text-gray-300",
      false: "text-gray-900",
    },
    hasLabel: {
      true: "mt-1.5",
      false: "",
    },
  },
  defaultVariants: {
    fullWidth: false,
    disabled: false,
    hasLabel: false,
  },
});

export const inputVariants = cva(
  [
    "block w-full rounded-md border border-gray-300 p-2 h-9 shadow-sm bg-transparent placeholder:text-gray-500",
    "focus:border-sky-300 focus:outline-0 focus:ring-4 focus:ring-sky-100 focus:ring-offset-0",
  ],
  {
    variants: {
      hasPrefix: {
        true: "pl-3",
      },
      hasSuffix: {
        true: "pr-3",
      },
    },
    defaultVariants: {
      hasPrefix: false,
      hasSuffix: false,
    },
  },
);

export interface PrefixSuffixRenderProps {
  disabled?: boolean;
}

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  fullWidth?: boolean;
  helperText?: React.ReactElement;
  renderPrefix?: ({ disabled }: PrefixSuffixRenderProps) => React.ReactElement;
  renderSuffix?: ({ disabled }: PrefixSuffixRenderProps) => React.ReactElement;
}

function getElementWidth<RefType extends HTMLElement | null>(
  elementRef: React.MutableRefObject<RefType>,
) {
  if (!elementRef?.current) {
    return "";
  }

  const spacingBetweenElementAndIndex = 4;

  return (
    Math.round(elementRef.current.getBoundingClientRect().width || 0) +
    spacingBetweenElementAndIndex
  );
}

const Input = React.forwardRef(
  (
    {
      children,
      className,
      disabled,
      fullWidth,
      helperText,
      name,
      id = name,
      renderPrefix,
      renderSuffix,
      type = "text",
      ...restProps
    }: InputProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
    const prefixRef = useRef<HTMLSpanElement | null>(null);
    const suffixRef = useRef<HTMLSpanElement | null>(null);

    const inputPaddingLeft = getElementWidth(prefixRef);
    const inputPaddingRight = getElementWidth(suffixRef);

    const prefixPresent = typeof renderPrefix === "function";
    const suffixPresent = typeof renderSuffix === "function";

    return (
      <div className={cn(fullWidth ? "w-full" : "")}>
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {children}
        </label>

        <div
          className={cn([
            inputContainerClasses({
              className,
              disabled,
              fullWidth,
              hasLabel: !!children,
            }),
          ])}
        >
          {prefixPresent ? (
            <span
              className="pointer-events-none absolute inset-y-0 left-0 flex items-center"
              ref={prefixRef}
            >
              {renderPrefix({ disabled })}
            </span>
          ) : null}

          <input
            style={
              inputPaddingLeft || inputPaddingRight
                ? {
                    paddingLeft: inputPaddingLeft,
                    paddingRight: inputPaddingRight,
                  }
                : {}
            }
            type={type}
            name={name}
            id={id}
            disabled={disabled}
            className={inputVariants({
              hasPrefix: prefixPresent,
              hasSuffix: suffixPresent,
            })}
            ref={ref}
            {...restProps}
          />

          {suffixPresent ? (
            <span
              className="absolute inset-y-0 right-0 flex items-center"
              ref={suffixRef}
            >
              {renderSuffix({ disabled })}
            </span>
          ) : null}
        </div>

        {helperText ? (
          <div className="mt-1.5 text-sm text-gray-600">{helperText}</div>
        ) : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;
