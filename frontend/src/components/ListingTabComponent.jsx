import { DateRangePicker, Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
import { RatingStarIcon } from "../constants/Icons";
import { dateRangePickerClassNames } from "../constants/dateRangePickerClassNames";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useFetch } from "../hooks/useFetch";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import { PopUpNotificationComponent } from "./PopUpNotificationComponent";

export const ListingTabComponent = () => {
  const[rating, setRating] = useState(0)
  const[timesRated, setTimesRated] = useState(0)
  const[dateRange, setDateRange] = useState(null)
  const[checkInDate, setCheckInDate] = useState('')
  const[checkOutDate, setCheckOutDate] = useState('')
  const[reserves, setReserves] = useState([])
  const location = useLocation()
  const navigate = useNavigate()
  const { auth } = useAuth()
  const { listing } = location.state
  const[showPopup, setShowPopup] = useState(false)
  const[popupData, setPopupData] = useState({ message: "", action: "", type: "" })

  useEffect(() => {
    getListingRating(listing.id)
    getListingReserves(listing.id)
  }, [])

  useEffect(() => {
    if (dateRange) {
      setCheckInDate(`${dateRange.start.year}-${dateRange.start.month}-${dateRange.start.day}`)
      setCheckOutDate(`${dateRange.end.year}-${dateRange.end.month}-${dateRange.end.day}`)
    }
  }, [dateRange])

  const getListingRating = async (id) => {
    try {
      const response = await useFetch(`/backend/api/v1/rating/info/${id}`, "GET", null, false)
      const data = await response.json()
      setRating(data.rating)
      setTimesRated(data.timesRated)
    } catch (error) {
      console.log(error)
    }
  }

  const getListingReserves = async (id) => {
    try {
      const response = await useFetch(`/backend/api/v1/reserve/listing/${id}`, "GET", null, false)
      const data = await response.json()
      setReserves(data.map((reserve) => [parseDate(reserve.checkInDate), parseDate(reserve.checkOutDate)]))

    } catch (error) {
      console.log(error)
    }
  }

  const addListingReserve = async () => {
    if (auth.user) {
      const formattedCheckInDate = new Date(checkInDate).toISOString().split('T')[0]
      const formattedCheckOutDate = new Date(checkOutDate).toISOString().split('T')[0]
      const reserve = { checkInDate: formattedCheckInDate, checkOutDate: formattedCheckOutDate }

      try {
        await useFetch(`/backend/api/v1/reserve?userEmail=${auth.user}&listingId=${listing.id}`, "POST", reserve)
        handlePopUp("Listing reserved successfully", "View Reserves", "success")
  
      } catch (error) {
        console.log(error)
      }
    } else {
      navigate("/auth/signin")
    }
  }

  const handlePopUp = (message, action, type) => {
    setShowPopup(true)
    setPopupData({ message, action, type })
    setTimeout(() => setShowPopup(false), 7500)
  }

  return (
    <section className="listing-section mt-5 mx-48 min-h-screen h-screen">
      <div className="flex justify-center my-5">
        <span className="text-3xl w-3/5 italic">{listing.title}</span>
      </div>
      <div className="flex justify-center h-3/6">
        <div className="grid grid-cols-4 grid-rows-2 gap-x-2 w-3/5">
          <div className="row-span-4 col-span-2">
            <img src={listing.images[0].imageUrl} alt={listing.title} className="rounded-lg w-full h-full hover:opacity-90"/>
          </div>

          {listing.images.slice(1, 5).map((image, index) => (
            <div 
              key={index} 
              className={`rounded-lg ${index < 2 ? 'mb-1' : 'mt-1'}`}
            >
              <img 
                src={image.imageUrl} 
                alt={`${listing.title} ${index + 2}`}
                className="rounded-lg w-full h-full hover:opacity-90"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mt-5 h-2/6">
        <div className="grid grid-cols-3 grid-rows-1 gap-x-10 w-3/5">
          <div className="col-span-2">
            <span className="text-2xl italic">
              {listing.description}
            </span>
            <div className="flex items-center mt-3 gap-2">
              <span className="flex items-center text-[18px] font-bold">
                <RatingStarIcon className="w-3 h-3 mr-1"/> {rating}
              </span>
              <span className="text-[14px] mx-0.5">•</span>
              <span className="text-[18px] underline font-bold">
                {timesRated} reviews
              </span>
            </div>
            <div className="border-y-1 border-solid border-main-gray mt-5 py-9">
              <span className="text-lg font-bold">
                What this place offers
              </span>
              <div className="grid grid-cols-2 grid-rows-3 max-h-20 h-20 my-5 gap-2">
                {listing.characteristics.slice(0, 6).map((characteristic, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <img src={characteristic.imageUrl} alt={`${characteristic.name} image`} className="h-full"/>
                    <span>{characteristic.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center border-1 border-solid border-main-gray rounded-xl shadow-md">
            <span className="text-lg font-bold mb-5">
              Make your reservation today!
            </span>
            <DateRangePicker
              variant="bordered"
              label="Check in - Check out"
              isDateUnavailable={(date) =>
                reserves.some(
                  (interval) => date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
                )
              }
              minValue={today(getLocalTimeZone())}
              validate={(value) =>
                reserves.some(
                  (interval) =>
                    value && value.end.compare(interval[0]) >= 0 && value.start.compare(interval[1]) <= 0
                )
                  ? "Selected date range may not include unavailable dates."
                  : null
              }
              validationBehavior="native"
              className="my-5 w-11/12"
              visibleMonths={2}
              value={dateRange}
              onChange={setDateRange}
              classNames={dateRangePickerClassNames}
            />
            <Button radius="medium" className="bg-main-orange w-11/12 text-white" onClick={addListingReserve}>
              Reserve
            </Button>
          </div>
        </div>
      </div>
      {showPopup && <PopUpNotificationComponent message={popupData.message} action={popupData.action} type={popupData.type}/>}
    </section>
  )
}
