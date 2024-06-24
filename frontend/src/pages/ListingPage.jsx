import { NavBarComponent } from "../components/NavBarComponent";
import { SearchBarComponent } from "../components/SearchBarComponent";
import { CategoryFilterComponent } from "../components/CategoryFilterComponent";
import { FooterComponent } from "../components/FooterComponent";
import { ListingSectionComponent } from "../components/ListingSectionComponent";

export const ListingPage = () => {
  return (
    <>
      <NavBarComponent />
      <SearchBarComponent />
      <CategoryFilterComponent />
      <ListingSectionComponent/>
      <FooterComponent/>
    </>
  )
}
