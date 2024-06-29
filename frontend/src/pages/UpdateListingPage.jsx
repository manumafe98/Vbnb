import { LayoutComponent } from "../components/LayoutComponent";
import { UpdateListingFormComponent } from "../components/UpdateListingFormComponent";
import { useLocation } from "react-router-dom";

export const UpdateListingPage = () => {
  const location = useLocation()
  const { listing } = location.state

  return (
    <LayoutComponent>
      <UpdateListingFormComponent listingToUpdate={listing}/>
    </LayoutComponent>
  )
}
