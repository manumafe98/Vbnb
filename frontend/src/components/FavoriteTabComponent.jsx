import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthProvider"
import { useFetch } from "../hooks/useFetch"
import { PopUpNotificationComponent } from "./PopUpNotificationComponent"

export const FavoriteTabComponent = () => {
  const[favorites, setFavorites] = useState([])
  const[showPopup, setShowPopup] = useState(false)
  const[popupData, setPopupData] = useState({ message: "", action: "", type: "" })
  const { auth } = useAuth()

  useEffect(() => {
    getUserFavorites()
  }, [])

  const getUserFavorites = async () => {
    try {
      const response = await useFetch(`/backend/api/v1/favorite/${auth.user}`, "GET")
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
      await useFetch(`/backend/api/v1/favorite?userEmail=${auth.user}&listingId=${listingId}`, "DELETE")
      getUserFavorites()
      handlePopUp("You removed the listing from favorites", null, "error")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Favorites</h1>
      </div>
      <ul className="space-y-4">
        {favorites.map((favorite) => (
          <li key={favorite.id.listingId} className="flex border rounded-lg p-4 shadow-sm">
            <div className="flex-shrink-0 w-32 h-32 mr-4">
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
