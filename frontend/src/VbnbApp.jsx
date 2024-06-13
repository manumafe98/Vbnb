import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { ListingPage } from "./pages/ListingPage"
import { SignInPage } from "./pages/SignInPage"
import { SignUpPage } from "./pages/SignUpPage"

export const VbnbApp = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListingPage />}></Route>
        <Route path="/auth/signin" element={<SignInPage />}></Route>
        <Route path="/auth/signup" element={<SignUpPage />}></Route>
        <Route path="/*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Router>
  )
}
