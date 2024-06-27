import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch"
import { Input, Button } from "@nextui-org/react";
import { inputWrapperClassNames } from "../constants/inputWrapperClassNames";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../constants/Icons";
import "../styles/AuthFormComponent.css";

export const AuthFormComponent = ({ authenticationType }) => {
  const { setAuth } = useAuth()

  const[name, setName] = useState('')
  const[lastName, setLastName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[confirmPassword, setConfirmPassword] = useState('')
  const[invalidRegistration, setInvalidRegistration] = useState(false)
  const[invalidUser, setInvalidUser] = useState(false)
  const[invalidPassword, setInvalidPassword] = useState(false)
  const[invalidEmail, setInvalidEmail] = useState(false)
  const[passwordsDoNotMatch, setPasswordsDoNotMatch] = useState(false)
  const[isVisible, setIsVisible] = useState(false)
  const navigate = useNavigate()

  const validEmailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

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
    setInvalidEmail(false)
    setPasswordsDoNotMatch(false)
  }

  const checkValidRegistration = () => {
    if (!validEmailRegex.test(email.trim())) {
      setInvalidEmail(true)
      return false
    } else if (password !== confirmPassword) {
      setPasswordsDoNotMatch(true)
      return false
    } else {
      return true
    }
  }

  const authenticateUser = async () => {
    clearErrorMessages()
    let validRegistration = true

    if (authenticationType === "Sign Up") {
      validRegistration = checkValidRegistration()
    }

    if (validRegistration) {
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
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="form-input"
          classNames={inputWrapperClassNames}
          onChange={(e) => setPassword(e.target.value)}
        />
        {authenticationType === "Sign Up" && (
          <>
            <Input
              label="Confirm"
              variant="bordered"
              placeholder="Confirm Password"
              endContent={
                <button className="focus:outline-none" type="button" onClick={() => setIsVisible(!isVisible)}>
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="form-input"
              classNames={inputWrapperClassNames}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
        <Button radius="full" className="bg-[#ff6f00] text-white" onClick={authenticateUser}>
          { authenticationType }
        </Button>
        { invalidRegistration && authenticationType === "Sign Up" && <p className="error-message">The email is already registered</p> }
        { invalidUser && <p className="error-message">Invalid user, sign up first</p> }
        { invalidPassword && <p className="error-message">Incorrect password, try again</p> }
        { invalidEmail && <p className="error-message">Please enter a valid email address</p> }
        { passwordsDoNotMatch && <p className="error-message">Passwords do not match, try again</p> }
      </div>
    </section>
  )
}
