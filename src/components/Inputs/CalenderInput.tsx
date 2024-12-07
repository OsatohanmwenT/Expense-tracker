"use client"

import { format, startOfDay, } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils.ts"
import { Button } from "@/components/ui/button.tsx"
import { Calendar } from "@/components/ui/calendar.tsx"
import {
  FormControl,
} from "@/components/ui/form.tsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx"
import {FieldValues} from "react-hook-form";

export interface CalendarInputProps {
  field: FieldValues
}

function CalenderInput({ field }: CalendarInputProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "pl-3 text-left font-normal dark:bg-black",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(startOfDay(field.value), "PPP")
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar className="dark:bg-black dark:text-white"
          mode="single"
          selected={field.value}
          onSelect={(date) => {
            field.onChange(date ? startOfDay(date) : null);
          }}
          disabled={(date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export default CalenderInput
