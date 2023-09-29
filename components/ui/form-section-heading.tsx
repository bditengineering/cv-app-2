import { FC } from "react";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const headingVariants = cva(
  "font-bold text-primary-light italic leading-tight tracking-tighter mb-4 mt-6",
  {
    variants: {
      size: {
        default: "text-4xl md:text-5xl lg:text-6xl",
        lg: "text-5xl md:text-6xl lg:text-7xl",
        sm: "text-2xl",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

interface SectionHeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {}

const SectionHeading: FC<SectionHeadingProps> = ({
  children,
  className,
  size,
  ...props
}) => {
  return (
    <h2 {...props} className={cn(headingVariants({ size, className }))}>
      {children}
    </h2>
  );
};

export default SectionHeading;
