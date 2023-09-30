"use client";

import { cn } from "@/lib/utils";
import Button from "@/ui/button";
import { Trash2 } from "lucide-react";

interface RemoveInputActionProps {
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const RemoveInputAction = ({ disabled, onClick }: RemoveInputActionProps) => (
  <Button
    className={cn([
      // add left border and remove radius
      // + add 1px margin (width of border) so container's border is not overlapped on hover and focus
      "rounded-l-none border-l border-l-gray-300 px-4 py-2",
      "hover:bg-inherit focus:m-0 focus:border focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100",
    ])}
    disabled={disabled}
    onClick={onClick}
    prefix={<Trash2 className="h-5 w-5" />}
    variant="plain"
  >
    <span className="hidden sm:inline">Remove</span>
  </Button>
);

export default RemoveInputAction;
