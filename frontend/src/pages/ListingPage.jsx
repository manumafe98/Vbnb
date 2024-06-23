import { NavBarComponent } from "../components/NavBarComponent";
import { SearchBarComponent } from "../components/SearchBarComponent";
import { CategoryFilterComponent } from "../components/CategoryFilterComponent";
import { FooterComponent } from "../components/FooterComponent";

export const ListingPage = () => {
  return (
    <>
      <NavBarComponent />
      <SearchBarComponent />
      <CategoryFilterComponent />
      <FooterComponent/>
    </>
  )
}
