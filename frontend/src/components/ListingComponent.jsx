import { Image } from "@nextui-org/image";
import { FavoriteIcon } from "../constants/Icons";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "../context/AuthProvider"
import { useNavigate } from "react-router-dom";

export const ListingComponent = ({ id, title, image, description }) => {
  const { auth } = useAuth()
  const navigate = useNavigate()
  const[listingId, setListingId] = useState('')

  useEffect(() => {
    addListingToFavorite()
  }, [listingId])

  const addListingToFavorite = async () => {
    await useFetch(`/backend/api/v1/favorite?userEmail=${auth.user}&listingId=${listingId}`, "POST", null, true)
      .catch(error => console.log(error))
  }

  const handleClick = (event) => {
    if (auth.user) {
      setListingId(event.currentTarget.value)
    } else {
      navigate("/auth/signin")
    }
  }

  return (
    <div className="listings-data relative">
      <button
        value={id}
        onClick={handleClick}
        className="group absolute transition-transform duration-300 hover:scale-110 p-2 bg-transparent border-none cursor-pointer z-10 top-2 right-2"
      >
        <FavoriteIcon className="w-6 h-6"/>
      </button>
      <Image
        alt={title}
        src={image}
        className="max-h-64 w-full z-1"
        classNames={{ wrapper: "!max-w-none" }}
      />
      <div className="pt-3 flex justify-between items-start">
        <div className="title">
          <p className="max-w-[17rem] font-semibold text-[17px]">
            {title}
          </p>
          <p className="max-w-[17rem] text-[16px] -mt-1 text-gray-500">
            {description} 
          </p>
        </div>
      </div>
    </div>
  )
}
