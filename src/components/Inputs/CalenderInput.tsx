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
import {ControllerRenderProps, FieldValues} from "react-hook-form";

interface CalendarInputProps {
  field: ControllerRenderProps<FieldValues, "date">
}

function CalenderInput({ field }: CalendarInputProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "pl-3 text-left font-normal bg-black",
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
        <Calendar className="bg-black text-white"
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
