import { SearchBarComponent } from "../components/SearchBarComponent";
import { ListingSectionComponent } from "../components/ListingSectionComponent";
import { useState } from "react";
import { LayoutComponent } from "../components/LayoutComponent";

export const ListingPage = () => {
  const[currentListings, setCurrentListings] = useState([])

  const handleListings = (listings) => {
    setCurrentListings(listings)
  }

  return (
    <LayoutComponent>
      <SearchBarComponent onSearching={handleListings}/>
      <ListingSectionComponent listings={currentListings}/>
    </LayoutComponent>
  )
}
