import { DateRangePicker } from "@nextui-org/react";
import { useState, useEffect } from "react";

export const CheckInOutComponent = ({ onDate }) => {
  const[checkInDate, setCheckInDate] = useState('')
  const[checkOutDate, setCheckOutDate] = useState('')

  useEffect(() => {
    onDate(checkInDate, checkOutDate)
  }, [checkInDate, checkOutDate])

  return (
    <DateRangePicker
      radius="full"
      label="Check in - Check out"
      className="max-w-xs"
      onChange={(e) => {
        setCheckInDate(`${e.start.year}-${e.start.month}-${e.start.day}`)
        setCheckOutDate(`${e.end.year}-${e.end.month}-${e.end.day}`)
      }}
    />
  )
}
