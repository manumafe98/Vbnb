import { DateRangePicker, Button, Avatar, Textarea } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { FavoriteIcon, RatingStarIcon, ReviewStarIcon, ShareIcon } from "../constants/Icons";
import { dateRangePickerClassNames } from "../constants/dateRangePickerClassNames";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthProvider";
import { useFetch } from "../hooks/useFetch";
import { parseDate, getLocalTimeZone, today } from "@internationalized/date";
import { PopUpNotificationComponent } from "./PopUpNotificationComponent";
import { XMarkIcon } from "../constants/Icons";
import { StarRatingComponent } from "./StarRatingComponent";
import { CopyLinkIcon, FacebookIcon, WhatsappIcon, TelegramIcon, TwitterIcon, LinkedinIcon } from "../constants/Icons";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton, TelegramShareButton } from "react-share";
import { fullSizeShareButtonStyle } from "../constants/fullSizeShareButtonStyle";
import { StarReviewComponent } from "./StarReviewComponent";
import { inputWrapperClassNames } from "../constants/inputWrapperClassNames";
import { DialogPopUpComponent } from "../components/DialogPopUpComponent";

export const ListingTabComponent = ({ listing }) => {
  const[rating, setRating] = useState(0)
  const[timesRated, setTimesRated] = useState(0)
  const[dateRange, setDateRange] = useState(null)
  const[checkInDate, setCheckInDate] = useState('')
  const[checkOutDate, setCheckOutDate] = useState('')
  const[reserves, setReserves] = useState([])
  const[reviews, setReviews] = useState([])
  const[showPopup, setShowPopup] = useState(false)
  const[popupData, setPopupData] = useState({ message: "", action: "", type: "" })
  const[dialogPopUpData, setDialogPopupData] = useState({ text: "", success: true })
  const[reviewRating, setReviewRating] = useState(0)
  const[reviewComment, setReviewComment] = useState('')
  const[showDialogNotification, setShowDialogNotification] = useState(false)
  const navigate = useNavigate()
  const { auth } = useAuth()
  const charecteristicDialogRef = useRef(null)
  const checkReviewsDialogRef = useRef(null)
  const imagesDialogRef = useRef(null)
  const shareListingRef = useRef(null)
  const addReviewRef = useRef(null)
  const totalCharacteristics = listing.characteristics.length
  const url = window.location.href
  const whatsappParams = `${listing.ownerPhoneNumber}?text=Hey, I'm contacting you to know more about ${listing.title} on Vbnb`

  useEffect(() => {
    getListingRating(listing.id)
    getListingReserves(listing.id)
    getListingReviews(listing.id)
  }, [])

  useEffect(() => {
    if (dateRange) {
      setCheckInDate(`${dateRange.start.year}-${dateRange.start.month}-${dateRange.start.day}`)
      setCheckOutDate(`${dateRange.end.year}-${dateRange.end.month}-${dateRange.end.day}`)
    }
  }, [dateRange])

  const getListingRating = async (id) => {
    try {
      const response = await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/rating/info/${id}`, "GET", null, false)
      const data = await response.json()
      setRating(data.rating)
      setTimesRated(data.timesRated)
    } catch (error) {
      console.log(error)
    }
  }

  const getListingReviews = async (id) => {
    try {
      const response = await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/rating/get/${id}`, "GET", null, false)
      const data = await response.json()
      setReviews(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getListingReserves = async (id) => {
    try {
      const response = await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/reserve/listing/${id}`, "GET", null, false)
      const data = await response.json()
      setReserves(data.map((reserve) => [parseDate(reserve.checkInDate), parseDate(reserve.checkOutDate)]))

    } catch (error) {
      console.log(error)
    }
  }

  const addListingReserve = async () => {
    if (auth.user) {
      if (checkInDate === "" || checkOutDate === "") {
        handlePopUp("Please select valid dates", null, "error")
      } else {
        const formattedCheckInDate = new Date(checkInDate).toISOString().split("T")[0]
        const formattedCheckOutDate = new Date(checkOutDate).toISOString().split("T")[0]
        const reserve = { checkInDate: formattedCheckInDate, checkOutDate: formattedCheckOutDate }
        try {
          await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/reserve?userEmail=${auth.user}&listingId=${listing.id}`, "POST", reserve)
          handlePopUp("Listing reserved successfully", "View Reserves", "success")
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      navigate("/auth/signin")
    }
  }

  const addListingToFavorite = async () => {
    if (auth.user) {
      try {
        const response = await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/favorite?userEmail=${auth.user}&listingId=${listing.id}`, "POST")
        handlePopUp("Added to Favorites", "View Favorites",  "success")

        if (!response.ok) {
          handlePopUp("Already added to Favorites", "View Favorites", "error")
        }

      } catch (error) {
        console.log(error)
      }
    } else {
      navigate("/auth/signin")
    }
  }

  const addListingReview = async () => {
    if (auth.user) {
      const ratingBody = { rating: reviewRating, comment: reviewComment }

      try {
        const response = await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/rating?listingId=${listing.id}&userEmail=${auth.user}`, "POST", ratingBody)
        if (response.ok) {
          handleDialogPopUp("Reviewed successfully", true)
          getListingReviews(listing.id)
        } else {
          handleDialogPopUp("Review failed", false)
        }
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

  const handleDialogPopUp = (text, success) => {
    setShowDialogNotification(true)
    setDialogPopupData({ text, success })
    setTimeout(() => setShowDialogNotification(false), 4000)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        handleDialogPopUp("Link Copied", true)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const showAllCharacteristics = () => {
    charecteristicDialogRef.current?.showModal()
  }

  const closeCharacteristicsDialog = () => {
    charecteristicDialogRef.current?.close()
  }

  const showAllReviews = () => {
    checkReviewsDialogRef.current?.showModal()
  }

  const closeReviewsDialog = () => {
    checkReviewsDialogRef.current?.close()
  }

  const showAllImages = () => {
    imagesDialogRef.current?.showModal()
  }

  const closeImagesDialog = () => {
    imagesDialogRef.current?.close()
  }

  const showListingShareSocials = () => {
    shareListingRef.current?.showModal()
  }

  const closeShareDialog = () => {
    shareListingRef.current?.close()
  }

  const showAddReviewDialog = () => {
    addReviewRef.current?.showModal()
  }

  const closeAddReviewDialog = () => {
    addReviewRef.current?.close()
    setReviewRating(0)
    setReviewComment("")
  }

  return (
    <section className="listing-section mt-5 mx-36 max-2xl:mx-20 max-xl:mx-2 max-lg:mx-0 min-h-screen h-[130vh] max-xl:h-[140vh] max-lg:h-[180vh] max-[639px]:h-[185vh] max-[560px]:h-[200vh] relative">
      <dialog
        ref={addReviewRef}
        className="fixed inset-0 m-auto backdrop:bg-black/65 rounded-xl min-h-[50vh] min-w-[30vw] max-lg:min-w-[80vw] p-5 w-fit h-fit"
      >
        <button
          className="flex items-center justify-center w-6 h-6 hover:bg-zinc-100 rounded-full hover:shadow mb-5"
          onClick={closeAddReviewDialog}
        >
          <XMarkIcon/>
        </button>
        <div className="flex flex-col justify-center items-center mt-5">
          <span className="text-2xl font-bold mb-10">
            Review this place
          </span>
          <StarReviewComponent rating={reviewRating} setRating={setReviewRating}/>
          <Textarea
            label="Review"
            variant="bordered"
            placeholder="Add your review comment"
            value={reviewComment}
            className="w-4/6 my-5"
            classNames={inputWrapperClassNames}
            onChange={(e) => setReviewComment(e.target.value)}
          />
          <Button color="primary" className="w-4/6" onClick={addListingReview}>
            Submit Review
          </Button>
        </div>
        {showDialogNotification && (
          <DialogPopUpComponent text={dialogPopUpData.text} success={dialogPopUpData.success}/>
        )}
      </dialog>
      <dialog 
        ref={shareListingRef}
        className="fixed inset-0 m-auto backdrop:bg-black/65 rounded-xl min-h-[50vh] min-w-[30vw] max-lg:min-w-[80vw] p-5 w-fit h-fit"
      >
        <button
          className="flex items-center justify-center w-6 h-6 hover:bg-zinc-100 rounded-full hover:shadow mb-5"
          onClick={closeShareDialog}
        >
          <XMarkIcon/>
        </button>
        <span className="text-2xl font-bold">
          Share this place
        </span>
        <div className="flex items-center w-11/12 h-20 my-5 gap-3">
          <img src={listing.images[0].imageUrl} alt="" className="h-full w-2/12 rounded-xl"/>
          <div className="flex flex-col">
            <span className="text-lg italic">{listing.title}</span>
            <span className="flex items-center">
              <RatingStarIcon className="w-3 h-3 mr-1"/> {rating ? rating.toFixed(1) : 0}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-3 gap-4 mt-8">
          <div className="flex items-center border-2 border-solid border-gray-300 rounded-xl h-12 hover:bg-gray-50">
            <button className="flex justify-center items-center w-full h-full p-1" onClick={copyLink}>
              <span className="flex items-center text-lg gap-3">
                <CopyLinkIcon className="w-6 h-6"/> Copy Link
              </span>
            </button>
          </div>
          <div className="flex items-center border-2 border-solid border-gray-300 rounded-xl hover:bg-gray-50">
            <FacebookShareButton url={url} style={fullSizeShareButtonStyle}>
              <span className="flex items-center text-lg gap-3">
                <FacebookIcon className="w-6 h-6"/> Facebook
              </span>
            </FacebookShareButton>
          </div>
          <div className="flex items-center border-2 border-solid border-gray-300 rounded-xl hover:bg-gray-50">
            <TwitterShareButton url={url} style={fullSizeShareButtonStyle}>
              <span className="flex items-center text-lg gap-3">
                <TwitterIcon className="w-6 h-6"/> Twitter
              </span>
            </TwitterShareButton>
          </div>
          <div className="flex items-center border-2 border-solid border-gray-300 rounded-xl hover:bg-gray-50">
            <TelegramShareButton url={url} style={fullSizeShareButtonStyle}>
              <span className="flex items-center text-lg gap-3">
                <TelegramIcon className="w-6 h-6"/> Telegram
              </span>
            </TelegramShareButton>
          </div>
          <div className="flex items-center border-2 border-solid border-gray-300 rounded-xl hover:bg-gray-50">
            <LinkedinShareButton url={url} style={fullSizeShareButtonStyle}>
              <span className="flex items-center text-lg gap-3">
                <LinkedinIcon className="w-6 h-6"/> Linkedin
              </span>
            </LinkedinShareButton>
          </div>
          <div className="flex items-center border-2 border-solid border-gray-300 rounded-xl hover:bg-gray-50">
            <WhatsappShareButton url={url} style={fullSizeShareButtonStyle}>
              <span className="flex items-center text-lg gap-3">
                <WhatsappIcon className="w-6 h-6"/> Whatsapp
              </span>
            </WhatsappShareButton>
          </div>
        </div>
        {showDialogNotification && (
          <DialogPopUpComponent text={dialogPopUpData.text} success={dialogPopUpData.success}/>
        )}
      </dialog>
      <dialog
        ref={imagesDialogRef}
        className="fixed inset-0 m-auto backdrop:bg-black/65 rounded-xl min-h-[90vh] min-w-[40vw] p-5 w-fit h-fit"
      >
        <button
          className="flex items-center justify-center w-6 h-6 hover:bg-zinc-100 rounded-full hover:shadow mb-5"
          onClick={closeImagesDialog}
        >
          <XMarkIcon/>
        </button>
        <div className="mt-5">
          {listing.images.map((image, index) => (
            <div key={index} className="flex justify-center items-center mb-2">
              <img
                src={image.imageUrl} 
                alt={`${listing.title} ${index + 2}`}
                className="rounded-lg w-full max-h-[90vh] hover:opacity-90 my-3"
              />
            </div>
          ))}
        </div>
      </dialog>
      <dialog
        ref={charecteristicDialogRef}
        className="fixed inset-0 m-auto backdrop:bg-black/65 rounded-xl min-h-[90vh] min-w-[40vw] max-lg:min-w-[80vw] p-5 w-fit h-fit"
      >
        <button
          className="flex items-center justify-center w-6 h-6 hover:bg-zinc-100 rounded-full hover:shadow mb-5"
          onClick={closeCharacteristicsDialog}
        >
          <XMarkIcon/>
        </button>
        <div>
          <span className="text-2xl font-bold">
            What this place offers
          </span>
          <div className="mt-5">
            {listing.characteristics.map((characteristic, index) => (
              <div key={index} className="flex items-center max-h-12 h-12 gap-2 p-2 mb-5 border-b-1 border-solid border-main-gray w-11/12">
                <img src={characteristic.imageUrl} alt={`${characteristic.name} image`} className="h-full"/>
                <span>{characteristic.name}</span>
              </div>
            ))}
          </div>
        </div>
      </dialog>
      <dialog
        ref={checkReviewsDialogRef}
        className="fixed inset-0 m-auto backdrop:bg-black/65 rounded-xl min-h-[90vh] min-w-[40vw] max-lg:min-w-[80vw] p-5 w-fit h-fit"
      >
        <button
          className="flex items-center justify-center w-6 h-6 hover:bg-zinc-100 rounded-full hover:shadow mb-5"
          onClick={closeReviewsDialog}
        >
          <XMarkIcon/>
        </button>
        <div>
          <span className="text-2xl font-bold">
            {reviews.length} reviews
          </span>
          <div className="mt-5">
            {reviews.map((review, index) => (
              <div key={index} className="block p-3 border-b-1 border-solid border-main-gray w-11/12">
                <div className="flex items-center gap-2">
                  <Avatar
                    classNames={{
                      base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] capitalize w-12 h-12"
                    }}
                    name={review.user.name}
                  />
                  <div className="flex flex-col gap-1">
                    <span className="font-bold">{review.user.name} {review.user.lastName}</span>
                    <span><StarRatingComponent rating={Math.round(review.rating)}/></span>
                  </div>
                </div>
                <div className="italic">{review.comment}</div>
              </div>
            ))}
          </div>
        </div>
      </dialog>
      <div className="flex justify-center my-5">
        <div className="flex justify-between w-4/6 max-2xl:w-9/12 max-xl:w-11/12  max-[550px]:items-center max-[550px]:flex-col max-[550px]:justify-center">
          <span className="text-3xl italic">{listing.title}</span>
          <div className="flex gap-5 max-md:gap-2 max-sm:gap-1">
            <button className="hover:bg-zinc-100 hover:shadow rounded-md p-1" onClick={showAddReviewDialog}>
              <div className="flex items-center gap-2 underline"><span><ReviewStarIcon className="w-5 h-5 max-sm:hidden"/></span>Review</div>
            </button>
            <button className="hover:bg-zinc-100 hover:shadow rounded-md p-1" onClick={showListingShareSocials}>
              <div className="flex items-center gap-2 underline"><span><ShareIcon className="w-5 h-5 max-sm:hidden"/></span>Share</div>
            </button>
            <button className="hover:bg-zinc-100 hover:shadow rounded-md p-1" onClick={addListingToFavorite}>
              <div className="flex items-center gap-2 underline"><span><FavoriteIcon className="w-5 h-5 max-sm:hidden"/></span>Save</div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center h-2/6 z-1">
        <div className="grid grid-cols-4 grid-rows-2 max-md:grid-cols-1 max-md:grid-rows-1 gap-x-2 w-4/6 max-2xl:w-9/12 max-xl:w-11/12 cursor-pointer relative" onClick={showAllImages}>
          <div className="row-span-4 col-span-2">
            <img src={listing.images[0].imageUrl} alt={listing.title} className="rounded-lg w-full h-full hover:opacity-90"/>
          </div>
          {listing.images.slice(1, 5).map((image, index) => (
            <div
              key={index} 
              className={`rounded-lg ${index < 2 ? "mb-1" : "mt-1"} max-md:hidden`}
            >
              <img
                src={image.imageUrl} 
                alt={`${listing.title} ${index + 2}`}
                className="rounded-lg w-full h-full hover:opacity-90"
              />
            </div>
          ))}
          <Button
            color="primary"
            radius="medium"
            variant="bordered"
            className="absolute bottom-2 right-2 z-10 w-2/12 max-md:w-4/12 max-[385px]:w-6/12 mt-2 font-bold bg-white"
            onClick={showAllImages}
          >
            Show all photos
          </Button>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <div className="grid grid-cols-3 grid-rows-1 gap-x-10 max-lg:grid-cols-1 max-lg:grid-rows-2 max-lg:gap-x-0 w-4/6 max-2xl:w-9/12 max-xl:w-11/12">
          <div className="col-span-2">
            <div className="max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
              <span className="text-2xl italic max-sm:text-center">
                {listing.description}
              </span>
              <div className="flex items-center mt-3 gap-2">
                <span className="flex items-center text-[18px] font-bold">
                  <RatingStarIcon className="w-3 h-3 mr-1"/> {rating ? rating.toFixed(1) : 0}
                </span>
                <span className="text-[14px] mx-0.5">•</span>
                <span className="text-[18px] underline font-bold">
                  {timesRated} reviews
                </span>
              </div>
            </div>
            <div className="border-y-1 border-solid border-main-gray mt-5 py-4 max-lg:flex max-lg:flex-col max-lg:items-center">
              <span className="text-lg font-bold">
                What this place offers
              </span>
              <div className="grid grid-cols-2 grid-rows-3 max-h-20 h-20 max-lg:h-full max-lg:w-full my-5 gap-2">
                {listing.characteristics.slice(0, totalCharacteristics > 6 ? 6 : totalCharacteristics).map((characteristic, index) => (
                  <div key={index} className="flex items-center max-lg:justify-center">
                    <div className="flex items-center gap-2 w-full max-w-[120px]">
                      <div className="w-6 flex-shrink-0">
                        <img src={characteristic.imageUrl} alt={`${characteristic.name} image`} className="h-full w-full object-contain"/>
                      </div>
                      <span className="truncate">{characteristic.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Button color="primary" radius="medium" variant="bordered" className="w-4/12 mt-2 font-bold max-xl:w-5/12 max-[465px]:w-6/12 max-[385px]:w-8/12" onClick={showAllCharacteristics}>
                Show all {totalCharacteristics} characteristics
              </Button>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center border-1 border-solid border-main-gray rounded-xl shadow-md max-lg:mt-5">
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
      <div className="flex justify-center my-5">
        <div className="w-4/6 max-2xl:w-9/12 max-xl:w-11/12 border-t-1 border-solid border-main-gray p-2">
          <div className="flex justify-center my-5">
            <span className="text-2xl font-bold">Reviews</span>
          </div>
          <div className="grid items-center grid-cols-2 grid-rows-2 max-[500px]:grid-cols-1 max-[500px]:grid-rows-2 max-h-56 h-56 gap-5">
            {reviews.slice(0, reviews.length > 4 ? 4 : reviews.length).map((review, index) => (
              <div key={index} className="flex flex-col items-center max-[500px]:items-start">
                <div className="flex items-center gap-2 max-[500px]:w-full max-[500px]:justify-center">
                  <div className="flex items-center gap-2 max-[500px]:w-full max-[500px]:max-w-[240px]">
                    <Avatar
                      classNames={{
                        base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] capitalize w-12 h-12 flex-shrink-0"
                      }}
                      name={review.user.name}
                    />
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{review.user.name} {review.user.lastName}</span>
                      <span><StarRatingComponent rating={Math.round(review.rating)}/></span>
                    </div>
                  </div>
                </div>
                <div className="italic text-center max-[500px]:text-left max-[500px]:w-full max-[500px]:max-w-[240px] max-[500px]:mx-auto">{review.comment}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Button color="primary" radius="medium" variant="bordered" className="w-3/12 mt-2 max-sm:w-4/12 max-[465px]:w-5/12 max-[385px]:w-7/12 font-bold" onClick={showAllReviews}>
              Show all {reviews.length} reviews
            </Button>
          </div>
        </div>
      </div>
      <div className="fixed group bottom-4 right-4 max-lg:bottom-16 max-lg:right-1 z-40">
        <a href={`https://wa.me/${whatsappParams}`} target="_blank">
          <WhatsappIcon className="fill-current text-[#00E676] w-14 h-14 group-hover:scale-110"/>
        </a>
      </div>
      {showPopup && <PopUpNotificationComponent message={popupData.message} action={popupData.action} type={popupData.type}/>}
    </section>
  )
}
