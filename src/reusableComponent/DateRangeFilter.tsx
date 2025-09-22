import * as React from "react"
import { format } from "date-fns"

import { CalendarIcon } from "lucide-react"

import type { DateRange } from "react-day-picker"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover"
import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"

type DateRangeFilterProps = {
  onChange: (range: DateRange | undefined) => void
}

export function DateRangeFilter({ onChange }: DateRangeFilterProps) {
  const [date, setDate] = React.useState<DateRange | undefined>()

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range)
    onChange(range)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className="w-[260px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={new Date()}
          selected={date}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  )
}
