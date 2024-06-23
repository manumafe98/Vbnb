import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedAuth = sessionStorage.getItem("auth")
    return storedAuth ? JSON.parse(storedAuth) : {}
  })

  useEffect(() => {
    sessionStorage.setItem("auth", JSON.stringify(auth))
  }, [auth])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      { children }
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
