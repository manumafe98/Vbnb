import { NavBarComponent } from "../components/NavBarComponent";
import { SearchBarComponent } from "../components/SearchBarComponent";
import { CategoryFilterComponent } from "../components/CategoryFilterComponent";
import { FooterComponent } from "../components/FooterComponent";
import { ListingSectionComponent } from "../components/ListingSectionComponent";
import { useState } from "react";

export const ListingPage = () => {
  const[currentListings, setCurrentListings] = useState([])

  const handleListings = (listings) => {
    setCurrentListings(listings)
  }

  return (
    <>
      <NavBarComponent/>
      <SearchBarComponent onListings={handleListings}/>
      <CategoryFilterComponent/>
      <ListingSectionComponent listings={currentListings}/>
      <FooterComponent/>
    </>
  )
}
