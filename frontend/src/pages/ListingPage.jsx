import { LayoutComponent } from '../components/LayoutComponent'
import { ListingTabComponent } from '../components/ListingTabComponent'
import { useLocation } from "react-router-dom";

export const ListingPage = () => {
  const location = useLocation()
  const { id } = location.state

  return (
    <LayoutComponent>
        <ListingTabComponent listingId={id}/>
    </LayoutComponent>
  )
}
