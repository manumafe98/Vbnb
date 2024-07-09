import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const PopUpNotificationComponent = ({ message, action = null, duration = 7500, type = "success" }) => {
  const[isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  const bgColor = type === "error" ? "bg-gray-800" : "bg-main-orange"
  const buttonTextColor = type === "error" ? "text-gray-800" : "text-main-orange"
  const bgHover = type === "error" ? "hover:bg-gray-100" : "hover:bg-orange-100"
  const justify = action ? "justify-between" : "justify-center"

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  const handleClick = () => {
    if (action.includes("Favorites")) {
      navigate("/user/favorites")
    } else if (action.includes("Reserves")) {
      navigate("/user/reserves")
    } else if (action.includes("Listings")) {
      navigate("/admin/administrate/listings")
    } else if (action.includes("Categories")) {
      navigate("/admin/administrate/categories")
    } else if (action.includes("Characteristics")) {
      navigate("/admin/administrate/characteristics")
    } else if (action.includes("Cities")) {
      navigate("/admin/administrate/cities")
    } else if (action.includes("Sign Up")) {
      navigate("/auth/signup")
    } else if (action.includes("Sign In")) {
      navigate("/auth/signin")
    }
  }

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 bottom-20 w-3/5 max-w-md
                  ${bgColor} text-white rounded-lg shadow-lg
                  transition-all duration-300 ease-in-out
                  ${isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
    >
      <div className={`flex ${justify} items-center p-4`}>
        <span>{message}</span>
        {action && (
          <button 
            className={`bg-white ${buttonTextColor} px-4 py-2 rounded ${bgHover} transition-colors`}
            onClick={handleClick}
          >
            { action }
          </button>
        )}
      </div>
    </div>
  )
}
