import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch"
import { Input, Button } from "@nextui-org/react";
import { inputWrapperClassNames } from "../constants/inputWrapperClassNames";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import "../styles/AuthFormComponent.css";

export const AuthFormComponent = ({ authenticationType }) => {
  const { setAuth } = useAuth()

  const[name, setName] = useState('')
  const[lastName, setLastName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[invalidRegistration, setInvalidRegistration] = useState(false)
  const[invalidUser, setInvalidUser] = useState(false)
  const[invalidPassword, setInvalidPassword] = useState(false)
  const navigate = useNavigate()
  
  const authUrl = authenticationType === "Sign Up" ? "/backend/api/v1/auth/register" : "/backend/api/v1/auth/authenticate"
  const userData = authenticationType === "Sign Up" ? { name, lastName, email, password } : { email, password }

  useEffect(() => {
    clearFormData()
    clearErrorMessages()
  }, [authenticationType])

  const clearFormData = () => {
    setEmail('')
    setPassword('')
  }

  const clearErrorMessages = () => {
    setInvalidRegistration(false)
    setInvalidUser(false)
    setInvalidPassword(false)
  }

  const authenticateUser = async (e) => {
    e.preventDefault()
    clearErrorMessages()

      await useFetch(authUrl, "POST", userData, false)
        .then(response => response.json())
        .then(data => {
          if (data.message === "User not found") {
            setInvalidUser(true)
          } else if (data.message === "Incorrect password") {
            setInvalidPassword(true)
          } else if (data.message === "Email already registered") {
            setInvalidRegistration(true)
          } else {
            if (authenticationType === "Sign Up") {
              navigate("/auth/signin")
            } else {
              const userRole = data.role

              const authData = { user: email, role: userRole, accessToken: data.token}
              setAuth(authData)

              if (userRole == "ADMIN") {
                navigate("/admin")
              } else {
                navigate("/")
              }
            }
          }          
        }).catch(error => console.log(error))
  }

  return (
    <section className="form-container">
      <div key={authenticationType} className="form">
        {authenticationType === "Sign Up" && (
          <div className="text-type-container">
            <Input 
              type="text" 
              variant="bordered" 
              label="Name" 
              className="form-input form-flex" 
              classNames={inputWrapperClassNames}
              onChange={(e) => setName(e.target.value)}
            />
            <Input 
              type="text" 
              variant="bordered" 
              label="Lastname" 
              className="form-input form-flex" 
              classNames={inputWrapperClassNames}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        )}
        <Input 
          type="email" 
          variant="bordered" 
          label="Email" 
          className="form-input"
          classNames={inputWrapperClassNames}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
          type="password"
          variant="bordered"
          label="password"
          autoComplete="off"
          className="form-input"
          classNames={inputWrapperClassNames}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button radius="full" className="bg-[#ff6f00] text-white" onClick={authenticateUser}>
          { authenticationType }
        </Button>
        { invalidRegistration && authenticationType === "Sign Up" && <p className="error-message">The email is already registered</p> }
        { invalidUser && <p className="error-message">Invalid user, sign up first</p> }
        { invalidPassword && <p className="error-message">Incorrect password, try again</p> }
      </div>
    </section>
  )
}
