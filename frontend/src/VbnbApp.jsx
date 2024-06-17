import { Route, Routes } from "react-router-dom"
import { ListingPage } from "./pages/ListingPage"
import { AuthenticationPage } from "./pages/AuthenticationPage"
import { AdminPage } from "./pages/AdminPage"
import { AddElementPage } from "./pages/AddElementPage"
import { MissingPage } from "./pages/MissingPage"
import { UnauthorizedPage } from "./pages/UnauthorizedPage"
import { RequireAuthComponent } from "./components/RequireAuthComponent"

export const VbnbApp = () => {

  return (
      <Routes>
        <Route path="/" element={<ListingPage />}></Route>
        <Route path="/auth/signin" element={<AuthenticationPage authenticationType="Sign In" />}></Route>
        <Route path="/auth/signup" element={<AuthenticationPage authenticationType="Sign Up" />}></Route>
        <Route path="/unauthorized" element={<UnauthorizedPage />}></Route>

        <Route element={<RequireAuthComponent allowedRole={"ADMIN"} />}>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/admin/add/category" element={<AddElementPage elementName="Category" />}></Route>
          <Route path="/admin/add/characteristic" element={<AddElementPage elementName="Characteristic" />}></Route>
          <Route path="/admin/add/city" element={<AddElementPage elementName="City" />}></Route>
          <Route path="/admin/add/listing" element={<AddElementPage elementName="Listing" />}></Route>
        </Route>
        
        <Route path="*" element={<MissingPage />}></Route>
      </Routes>
  )
}
