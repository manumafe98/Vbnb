import { useState } from "react";
import { useFetch } from "../hooks/useFetch"
import { Input, Button } from "@nextui-org/react";
import { inputWrapperClassNames } from "../constants/inputWrapperClassNames";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { EyeFilledIcon, EyeSlashFilledIcon } from "../constants/Icons";
import { PopUpNotificationComponent } from "./PopUpNotificationComponent";

export const AuthFormComponent = ({ authenticationType }) => {
  const { setAuth } = useAuth()

  const[name, setName] = useState('')
  const[lastName, setLastName] = useState('')
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[confirmPassword, setConfirmPassword] = useState('')
  const[isVisible, setIsVisible] = useState(false)
  const[showPopup, setShowPopup] = useState(false)
  const[popupData, setPopupData] = useState({ message: "", action: "", type: "" })
  const navigate = useNavigate()

  const validEmailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

  const authUrl = authenticationType === "Sign Up" ? "/backend/api/v1/auth/register" : "/backend/api/v1/auth/authenticate"
  const userData = authenticationType === "Sign Up" ? { name, lastName, email, password } : { email, password }

  const checkValidRegistration = () => {
    if (!name.trim()) {
      handlePopUp("Please enter a valid name", null, "error")
      return false
    } else if (!lastName.trim()) {
      handlePopUp("Please enter a valid last name", null, "error")
      return false
    } else if (!validEmailRegex.test(email.trim())) {
      handlePopUp("Please enter a valid email address", null, "error")
      return false
    } else if (password !== confirmPassword) {
      handlePopUp("Passwords do not match, try again", null, "error")
      return false
    }

    return true
  }
  
  const handlePopUp = (message, action, type) => {
    setShowPopup(true)
    setPopupData({ message, action, type })
    setTimeout(() => setShowPopup(false), 7500)
  }  

  const authenticateUser = async () => {
    let validRegistration = true

    if (authenticationType === "Sign Up") {
      validRegistration = checkValidRegistration()
    }

    if (validRegistration) {
      try {
        const response = await useFetch(authUrl, "POST", userData, false)
        const data = await response.json()

        if (data.message === "User not found") {
          handlePopUp("Invalid user, sign up first", "Sign Up", "error")
        } else if (data.message === "Incorrect password") {
          handlePopUp("Incorrect password, try again", null, "error")
        } else if (data.message === "Email already registered") {
          handlePopUp("The email is already registered", "Sign In", "error")
        } else {
          if (authenticationType === "Sign Up") {
            navigate("/auth/signin")
            handlePopUp("Successful Register", null, "success")
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
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <section className="flex justify-center my-auto min-h-full">
      <div key={authenticationType} className="flex flex-col items-center justify-center w-1/5 h-2/4 min-h-80 mt-3 border-1 border-solid border-main-gray rounded-xl shadow-md p-6">
        <div>
          <h1 className="text-3xl font-bold text-main-orange mb-8">{authenticationType}</h1>
        </div>
        {authenticationType === "Sign Up" && (
          <div className="flex min-w-[100%] justify-center text-type-container">
            <Input
              type="text"
              variant="bordered"
              label="Name"
              className="w-[31%] mb-2.5"
              classNames={inputWrapperClassNames}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="text"
              variant="bordered"
              label="Lastname"
              className="w-[31%] mb-2.5"
              classNames={inputWrapperClassNames}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        )}
        <Input
          type="email"
          variant="bordered"
          label="Email"
          className="w-[65%] mb-2.5"
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
          className="w-[65%] mb-2.5"
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
              className="w-[65%] mb-2.5"
              classNames={inputWrapperClassNames}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
        <Button radius="full" className="bg-main-orange w-[65%] text-white" onClick={authenticateUser}>
          { authenticationType }
        </Button>
        {showPopup && <PopUpNotificationComponent message={popupData.message} action={popupData.action} type={popupData.type}/>}
      </div>
    </section>
  )
}
