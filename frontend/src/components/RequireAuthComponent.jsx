import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useState, useEffect } from "react";

export const RequireAuthComponent = ({ allowedRole }) => {
  const { auth } = useAuth()
  const location = useLocation()
  const[isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  if (allowedRole === "ADMIN" && isSmallScreen) {
    return <Navigate to="/unavailable" state={{ from: location }} replace/>
  }

  return (
    auth?.role === allowedRole
      ? <Outlet/>
      : auth?.user
          ? <Navigate to="/unauthorized" state={{ from: location }} replace/>
          : <Navigate to="/auth/signin" state={{ from: location }} replace/>
  )
}
