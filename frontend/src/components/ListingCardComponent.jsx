import { FavoriteIcon, RatingStarIcon } from "../constants/Icons";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { ImageCarouselComponent } from "./ImageCarouselComponent";
import { useFetch } from "../hooks/useFetch";

export const ListingCardComponent = ({ id, title, images, description, rating, onFavoriteSelection }) => {
  const { auth } = useAuth()
  const navigate = useNavigate()

  const handleFavoriteClick = (event) => {
    event.stopPropagation()

    if (auth.user) {
      const listingId = event.currentTarget.value
      onFavoriteSelection(listingId)
    } else {
      navigate("/auth/signin")
    }
  }

  const handleCardClick = async () => {
    try {
      const response = await useFetch(`/backend/api/v1/listing/get/${id}`, "GET", null, false)
      const listing = await response.json()
      navigate("/listing", { state: { listing } })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="listings-data relative cursor-pointer"
      onClick={handleCardClick}>
      <button
        value={id}
        onClick={handleFavoriteClick}
        className="favorite-button group absolute transition-transform duration-300 hover:scale-110 p-2 bg-transparent border-none cursor-pointer z-10 top-2 right-2"
      >
        <FavoriteIcon className="fill-current text-main-orange w-6 h-6"/>
      </button>
      <ImageCarouselComponent>
        {[
          ...images.map((image) =>
            <img key={image.id} src={image.imageUrl} alt={title} className=" rounded-md"/>
          )
        ]}
      </ImageCarouselComponent>
      <div className="pt-3 flex justify-between items-start">
        <div className="title">
          <p className="max-w-[17rem] font-semibold text-[17px]">
            {title}
          </p>
          <p className="max-w-[17rem] text-[16px] -mt-1 text-gray-500">
            {description}
          </p>
        </div>
        <div className="flex items-center space-x-1 me-1">
        <span className="flex items-center gap-1 text-[15px]">
          <RatingStarIcon className="w-3 h-3"/> {rating !== null ? rating.toFixed(1) : 0}
        </span>
        </div>
      </div>
    </div>
  )
}
