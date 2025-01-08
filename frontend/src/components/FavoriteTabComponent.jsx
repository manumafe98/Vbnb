import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useFetch } from "../hooks/useFetch";
import { PopUpNotificationComponent } from "./PopUpNotificationComponent";
import { useNavigate } from "react-router-dom";

export const FavoriteTabComponent = () => {
  const[favorites, setFavorites] = useState([])
  const[showPopup, setShowPopup] = useState(false)
  const[popupData, setPopupData] = useState({ message: "", action: "", type: "" })
  const navigate = useNavigate()
  const { auth } = useAuth()

  useEffect(() => {
    getUserFavorites()
  }, [])

  const getUserFavorites = async () => {
    try {
      const response = await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/favorite/${auth.user}`, "GET")
      const data = await response.json()
      setFavorites(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handlePopUp = (message, action, type) => {
    setShowPopup(true)
    setPopupData({ message, action, type })
    setTimeout(() => setShowPopup(false), 7500)
  }

  const deleteFavorite = async (event) => {
    const listingId = event.target.value
    try {
      await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/favorite?userEmail=${auth.user}&listingId=${listingId}`, "DELETE")
      getUserFavorites()
      handlePopUp("You removed the listing from favorites", null, "error")
    } catch (error) {
      console.log(error)
    }
  }

  const handleCardClick = async (event) => {
    const id = event.currentTarget.dataset.value

    try {
      const response = await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/listing/get/${id}`, "GET", null, false)
      const listing = await response.json()
      navigate(`/listing/${listing.id}`, { state: { listing } })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full max-w-4xl md:w-[85%] sm:w-[95%] max-[639px]:w-[90%] mx-auto my-5 max-md:my-10">
      <div className="flex justify-between max-lg:justify-center items-center mb-5">
        <h1 className="text-2xl max-lg:text-3xl font-bold text-main-orange">Favorites</h1>
      </div>
      <ul className="space-y-4">
        {favorites.map((favorite) => (
          <li key={favorite.id.listingId} className="flex border rounded-lg p-4 shadow-sm">
            <div
              data-value={favorite.listing.id}
              className="flex-shrink-0 w-32 h-32 mr-4 cursor-pointer"
              onClick={handleCardClick}
            >
              <img
                className="w-full h-full object-cover rounded"
                src={favorite.listing.images[0].imageUrl}
                alt={favorite.listing.title}
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-lg font-semibold mb-2">{favorite.listing.title}</h2>
              <p className="text-gray-600 mb-2">{favorite.listing.description}</p>
              <div className="flex justify-between items-center">
                <div className="space-x-2">
                  <button value={favorite.id.listingId} className="text-blue-500" onClick={deleteFavorite}>Delete</button>
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
