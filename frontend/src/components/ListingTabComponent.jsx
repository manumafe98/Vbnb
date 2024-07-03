import { DateRangePicker, Button } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { RatingStarIcon } from "../constants/Icons";
import { dateRangePickerClassNames } from "../constants/dateRangePickerClassNames";
import { useState, useEffect } from "react";

export const ListingTabComponent = () => {
  const[rating, setRating] = useState(0)
  const[timesRated, setTimesRated] = useState(0)
  const location = useLocation()
  const { listing } = location.state

  useEffect(() => {
    getListingRating(listing.id)
  }, [])

  const getListingRating = async (id) => {
    try {
      const response = await useFetch(`/backend/api/v1/rating/info/${id}`, "GET", null, false)
      const data = await response.json()
      setRating(data.rating)
      timesRated(data.timesRated)
    } catch (error) {
      console.log(error)
    }
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
                    <img src={characteristic.imageUrl} alt="" className="h-full"/>
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
              className="my-5 w-11/12"
              classNames={dateRangePickerClassNames}
            />
            <Button radius="medium" className="bg-main-orange w-11/12 text-white">
              Reserve
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
