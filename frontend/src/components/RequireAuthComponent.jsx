import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"

export const RequireAuthComponent = ({ allowedRole }) => {
  const { auth } = useAuth()
  const location = useLocation()

  return (
    auth?.role === allowedRole
      ? <Outlet/>
      : auth?.user
          ? <Navigate to="/unauthorized" state={{ from: location }} replace />
          : <Navigate to="/auth/signin" state={{ from: location }} replace />
  )
}
