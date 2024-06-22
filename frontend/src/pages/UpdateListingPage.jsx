import { NavBarComponent } from "../components/NavBarComponent"
import { UpdateListingFormComponent } from "../components/UpdateListingFormComponent"
import { useLocation } from "react-router-dom"

export const UpdateListingPage = () => {
  const location = useLocation()
  const { listing } = location.state

  return (
    <>
      <NavBarComponent/>
      <UpdateListingFormComponent listingToUpdate={listing}/>
    </>
  )
}
