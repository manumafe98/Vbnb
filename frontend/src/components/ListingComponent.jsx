import { FavoriteIcon, RatingStarIcon } from "../constants/Icons";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom";
import { ImageCarouselComponent } from "./ImageCarouselComponent";

export const ListingComponent = ({ id, title, images, description, rating }) => {
  const { auth } = useAuth()
  const navigate = useNavigate()

  console.log(rating)

  const addListingToFavorite = async (event) => {
    if (auth.user) {
      const listingId = event.currentTarget.value
      
      await useFetch(`/backend/api/v1/favorite?userEmail=${auth.user}&listingId=${listingId}`, "POST", null, true)
        .catch(error => console.log(error))
    } else {
      navigate("/auth/signin")
    }
  }

  return (
    <div className="listings-data relative">
      <button
        value={id}
        onClick={addListingToFavorite}
        className="group absolute transition-transform duration-300 hover:scale-110 p-2 bg-transparent border-none cursor-pointer z-10 top-2 right-2"
      >
        <FavoriteIcon className="w-6 h-6"/>
      </button>
      <ImageCarouselComponent>
        {[
          ...images.map((image) => 
            <img src={image.imageUrl} alt={title} className="w-full rounded-md"/>
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
          <RatingStarIcon/>
          <p className="text-[15px]">{rating !== null ? rating.toFixed(1) : 0}</p>
        </div>
      </div>
    </div>
  )
}
