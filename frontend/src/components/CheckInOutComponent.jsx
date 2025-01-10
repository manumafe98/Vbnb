import { DateRangePicker } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { XMarkIcon } from "../constants/Icons";
import { dateRangePickerClassNames } from "../constants/dateRangePickerClassNames";

export const CheckInOutComponent = ({ onDate, radius, variant }) => {
  const[dateRange, setDateRange] = useState(null)
  const[checkInDate, setCheckInDate] = useState('')
  const[checkOutDate, setCheckOutDate] = useState('')
  const[calendarMonths, setCalendarMonths] = useState(2)

  const updateCalendarMonths = () => {
    if (window.innerWidth < 540) {
      setCalendarMonths(1)
    } else {
      setCalendarMonths(2)
    }
  }

  useEffect(() => {
    updateCalendarMonths()
    const handleResize = () => updateCalendarMonths()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (dateRange) {
      setCheckInDate(`${dateRange.start.year}-${dateRange.start.month}-${dateRange.start.day}`)
      setCheckOutDate(`${dateRange.end.year}-${dateRange.end.month}-${dateRange.end.day}`)
    } else {
      setCheckInDate(null)
      setCheckOutDate(null)
    }
  }, [dateRange])

  useEffect(() => {
    onDate(checkInDate, checkOutDate)
  }, [checkInDate, checkOutDate])

  return (
    <DateRangePicker
      radius={radius}
      variant={variant}
      label="Check in - Check out"
      className="sm:w-full max-sm:mb-2"
      visibleMonths={calendarMonths}
      value={dateRange}
      onChange={setDateRange}
      classNames={dateRangePickerClassNames}
      startContent={
        <button
          className="group absolute right-10 sm:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => setDateRange(null)}
        >
          <XMarkIcon/>
        </button>
      }
    />
  )
}
