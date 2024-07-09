import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useFetch } from "../hooks/useFetch";
import { PopUpNotificationComponent } from "./PopUpNotificationComponent";
import { useNavigate } from "react-router-dom";
import { DateRangePicker, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { dateRangePickerClassNames } from "../constants/dateRangePickerClassNames";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";

export const ReserveTabComponent = () => {
  const[reserves, setReserves] = useState([])
  const[showPopup, setShowPopup] = useState(false)
  const[popupData, setPopupData] = useState({ message: "", action: "", type: "" })
  const[dateRange, setDateRange] = useState(null)
  const[checkInDate, setCheckInDate] = useState('')
  const[checkOutDate, setCheckOutDate] = useState('')
  const[listingId, setListingId] = useState(0)
  const[listingReserves, setListingReserves] = useState([])
  const[currentReserve, setCurrentReserve] = useState([])
  const[currentReserveId, setCurrentReserveId] = useState(0)
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const { auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getUserReserves()
  }, [])

  useEffect(() => {
    if (listingId && currentReserve.length === 2) {
      getListingReserves(listingId);
    }
  }, [listingId, currentReserve])

  useEffect(() => {
    if (dateRange) {
      setCheckInDate(`${dateRange.start.year}-${dateRange.start.month}-${dateRange.start.day}`)
      setCheckOutDate(`${dateRange.end.year}-${dateRange.end.month}-${dateRange.end.day}`)
    }
  }, [dateRange])

  const getUserReserves = async () => {
    try {
      const response = await useFetch(`/backend/api/v1/reserve/current/${auth.user}`, "GET")
      const data = await response.json()
      setReserves(data);
    } catch (error) {
      console.log(error)
    }
  }

  const getListingReserves = async (id) => {
    try {
      const response = await useFetch(`/backend/api/v1/reserve/listing/${id}`, "GET", null, false)
      const data = await response.json()
      setListingReserves(
        data
          .map((reserve) => [parseDate(reserve.checkInDate), parseDate(reserve.checkOutDate)])
          .filter(
            (reserve) => 
              !(reserve[0].compare(currentReserve[0]) === 0 && reserve[1].compare(currentReserve[1]) === 0)
          )
      )
    } catch (error) {
      console.log(error)
    }
  }

  const deleteReserve = async (event) => {
    const reserveId = event.target.value

    try {
      await useFetch(`/backend/api/v1/reserve?reserveId=${reserveId}`, "DELETE")
      getUserReserves()
      handlePopUp("Your reservation has been deleted", null, "error")
    } catch (error) {
      console.log(error)
    }
  }

  const updateReserve = async () => {
    const formattedCheckInDate = new Date(checkInDate).toISOString().split('T')[0]
    const formattedCheckOutDate = new Date(checkOutDate).toISOString().split('T')[0]
    const reserve = { checkInDate: formattedCheckInDate, checkOutDate: formattedCheckOutDate }

    try {
      await useFetch(`/backend/api/v1/reserve?reserveId=${currentReserveId}`, "PUT", reserve)
      onOpenChange(false)
      handlePopUp("Your reservation was successfully updated", null, "success")
      getUserReserves()
    } catch (error) {
      console.log(error)
    }
  }

  const handlePopUp = (message, action, type) => {
    setShowPopup(true)
    setPopupData({ message, action, type })
    setTimeout(() => setShowPopup(false), 7500)
  }

  const handleOpen = (event) => {
    const reserveData = JSON.parse(event.target.dataset.reserve)
    const startDate = parseDate(reserveData.checkInDate)
    const endDate = parseDate(reserveData.checkOutDate)

    setCurrentReserveId(reserveData.id)
    setListingId(reserveData.listing.id)
    setCurrentReserve([startDate, endDate])
    setDateRange({ start: startDate, end: endDate })

    onOpen()
  }

  const handleCardClick = async (event) => {
    const id = event.currentTarget.dataset.value

    try {
      const response = await useFetch(`/backend/api/v1/listing/get/${id}`, "GET", null, false)
      const listing = await response.json()
      navigate("/listing", { state: { listing } })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full max-w-4xl md:w-[85%] sm:w-[95%] max-[639px]:w-[90%] mx-auto my-5 max-md:my-10">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Update Reserve</ModalHeader>
              <ModalBody>
                <DateRangePicker
                  variant="bordered"
                  label="Check in - Check out"
                  isDateUnavailable={(date) =>
                    listingReserves.some(
                      (interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
                    )
                  }
                  minValue={today(getLocalTimeZone())}
                  validate={(value) =>
                    listingReserves.some(
                      (interval) =>
                        value && value.end.compare(interval[0]) >= 0 && value.start.compare(interval[1]) <= 0
                    )
                      ? "Selected date range may not include unavailable dates."
                      : null
                  }
                  validationBehavior="native"
                  visibleMonths={2}
                  value={dateRange}
                  onChange={setDateRange}
                  className="mt-5"
                  classNames={dateRangePickerClassNames}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="bordered" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={updateReserve}>
                  Update
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex justify-between max-lg:justify-center items-center mb-5">
        <h1 className="text-2xl max-lg:text-3xl font-bold text-main-orange">Reserves</h1>
      </div>
      <ul className="space-y-4">
        {reserves.map((reserve) => (
          <li key={reserve.id} className="flex border rounded-lg p-4 shadow-sm">
            <div
              data-value={reserve.listing.id}
              className="flex-shrink-0 w-32 h-32 max-md:w-36 max-md:h-44 mr-4 cursor-pointer"
              onClick={handleCardClick}
            >
              <img
                className="w-full h-full object-cover rounded"
                src={reserve.listing.images[0].imageUrl}
                alt={reserve.listing.title}
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-2">{reserve.listing.title}</h2>
              <p className="text-gray-600 mb-2">{reserve.listing.description}</p>
              <div className="flex gap-3">
                <p className="text-gray-600 font-bold mb-2">Check in: <span className="font-normal">{reserve.checkInDate}</span></p>
                <p className="text-gray-600 font-bold mb-2">Check out: <span className="font-normal">{reserve.checkOutDate}</span></p>
              </div>
              <div className="flex items-center gap-3">
                <div className="space-x-2">
                  <button value={reserve.id} className="text-blue-500" onClick={deleteReserve}>Delete</button>
                </div>
                <div className="space-x-2">
                  <button data-reserve={JSON.stringify(reserve)} className="text-blue-500" onClick={handleOpen}>Update</button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showPopup && <PopUpNotificationComponent message={popupData.message} action={popupData.action} type={popupData.type}/>}
    </div>
  )
}
