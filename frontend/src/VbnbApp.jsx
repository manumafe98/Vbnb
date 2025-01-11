import { Route, Routes } from "react-router-dom";
import { RequireAuthComponent } from "./components/RequireAuthComponent";
import { useFetch } from "./hooks/useFetch";
import { AddElementPage } from "./pages/AddElementPage";
import { AdminPage } from "./pages/AdminPage";
import { AuthenticationPage } from "./pages/AuthenticationPage";
import { ElementAdministrationPage } from "./pages/ElementAdministrationPage";
import { FavoritePage } from "./pages/FavoritePage";
import { HomePage } from "./pages/HomePage";
import { ListingAdministrationPage } from "./pages/ListingAdministrationPage";
import { ListingPage } from "./pages/ListingPage";
import { MissingPage } from "./pages/MissingPage";
import { ReservePage } from "./pages/ReservePage";
import { UnauthorizedPage } from "./pages/UnauthorizedPage";
import { UnavailablePage } from "./pages/UnavailablePage";
import { UpdateCharacteristicPage } from "./pages/UpdateCharacteristicPage";
import { UpdateListingPage } from "./pages/UpdateListingPage";
import { UserAdministrationPage } from "./pages/UserAdministrationPage";

export const VbnbApp = () => {
  return (
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/listing/:id" element={<ListingPage/>}></Route>
        <Route path="/auth/signin" element={<AuthenticationPage authenticationType="Sign In"/>}></Route>
        <Route path="/auth/signup" element={<AuthenticationPage authenticationType="Sign Up"/>}></Route>
        <Route path="/unauthorized" element={<UnauthorizedPage/>}></Route>
        <Route path="/unavailable" element={<UnavailablePage/>}></Route>

        <Route element={<RequireAuthComponent allowedRole={"ADMIN"}/>}>
          <Route path="/admin" element={<AdminPage/>}></Route>
          <Route path="/admin/add/category" element={<AddElementPage elementName="Category"/>}></Route>
          <Route path="/admin/add/characteristic" element={<AddElementPage elementName="Characteristic"/>}></Route>
          <Route path="/admin/add/city" element={<AddElementPage elementName="City"/>}></Route>
          <Route path="/admin/add/listing" element={<AddElementPage elementName="Listing"/>}></Route>
          <Route path="/admin/administrate/users" element={<UserAdministrationPage/>}></Route>
          <Route path="/admin/administrate/listings" element={<ListingAdministrationPage/>}></Route>
          <Route path="/admin/administrate/cities" element={<ElementAdministrationPage elementName="city"/>}></Route>
          <Route path="/admin/administrate/categories" element={<ElementAdministrationPage elementName="category"/>}></Route>
          <Route path="/admin/administrate/characteristics" element={<ElementAdministrationPage elementName="characteristic"/>}></Route>
          <Route path="/admin/update/characteristics" element={<UpdateCharacteristicPage/>}></Route>
          <Route path="/admin/update/listings" element={<UpdateListingPage/>}></Route>
        </Route>

        <Route element={<RequireAuthComponent allowedRole={"USER"}/>}>
          <Route path="/user/favorites" element={<FavoritePage/>}></Route>
          <Route path="/user/reserves" element={<ReservePage/>}></Route>
        </Route>

        <Route path="*" element={<MissingPage/>}></Route>
      </Routes>
  )
}
