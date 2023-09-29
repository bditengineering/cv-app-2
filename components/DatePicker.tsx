"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import Calendar from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Button from "@/ui/button";
import { inputVariants } from "@/ui/input";

interface DatePickerProps {
  setField?: (date: Date) => void;
  selectedDate?: string;
}

export default function DatePicker({
  setField,
  selectedDate,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    selectedDate ? new Date(selectedDate) : undefined,
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outlined"
          className={cn(
            inputVariants(),
            "flex flex-row justify-start text-left font-normal hover:bg-slate-100",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          fromYear={2000}
          toYear={new Date().getFullYear()}
          selected={date}
          onSelect={(date) => {
            setDate(date);
            if (setField && typeof setField === "function" && date) {
              setField(date);
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
