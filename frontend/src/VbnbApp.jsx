import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { ListingPage } from "./pages/ListingPage"
import { AuthenticationPage } from "./pages/AuthenticationPage"
import { AdminPage } from "./pages/AdminPage"
import { AddElementPage } from "./pages/AddElementPage"

export const VbnbApp = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListingPage />}></Route>
        <Route path="/auth/signin" element={<AuthenticationPage authenticationType="Sign In"/>}></Route>
        <Route path="/auth/signup" element={<AuthenticationPage authenticationType="Sign Up"/>}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/admin/add/category" element={<AddElementPage elementName="Category" />}></Route>
        <Route path="/admin/add/characteristic" element={<AddElementPage elementName="Characteristic" />}></Route>
        <Route path="/admin/add/city" element={<AddElementPage elementName="City" />}></Route>
        <Route path="/*" element={<Navigate to="/" />}></Route>
      </Routes>
    </Router>
  )
}
