import { DateRangePicker } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { XMarkIcon } from "../constants/Icons";

export const CheckInOutComponent = ({ onDate }) => {
  const[dateRange, setDateRange] = useState(null)
  const[checkInDate, setCheckInDate] = useState('')
  const[checkOutDate, setCheckOutDate] = useState('')

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
      radius="full"
      label="Check in - Check out"
      className="max-w-xs"
      value={dateRange}
      onChange={setDateRange}
      startContent={
        <button
          className="group absolute right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          onClick={() => setDateRange(null)}
        >
          <XMarkIcon/>
        </button>
      }
    />
  )
}
