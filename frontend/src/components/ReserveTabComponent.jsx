import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthProvider"
import { useFetch } from "../hooks/useFetch"
import { PopUpNotificationComponent } from "./PopUpNotificationComponent"
import { useNavigate } from "react-router-dom"

export const ReserveTabComponent = () => {
  const[reserves, setReserves] = useState([])
  const[showPopup, setShowPopup] = useState(false)
  const[popupData, setPopupData] = useState({ message: "", action: "", type: "" })
  const { auth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getUserReserves()
  }, [])

  const getUserReserves = async () => {
    try {
      const response = await useFetch(`/backend/api/v1/reserve/current/${auth.user}`, "GET")
      const data = await response.json()
      setReserves(data);
    } catch (error) {
      console.log(error)
    }
  }

  const handlePopUp = (message, action, type) => {
    setShowPopup(true)
    setPopupData({ message, action, type })
    setTimeout(() => setShowPopup(false), 7500)
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

  const updateReserve = async (event) => {
    console.log("placeholder")
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
    <div className="w-full max-w-4xl mx-auto my-5">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reserves</h1>
      </div>
      <ul className="space-y-4">
        {reserves.map((reserve) => (
          <li key={reserve.id} className="flex border rounded-lg p-4 shadow-sm">
            <div
              data-value={reserve.listing.id}
              className="flex-shrink-0 w-32 h-32 mr-4 cursor-pointer"
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
                  <button value={reserve.id} className="text-blue-500" onClick={updateReserve}>Update</button>
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
