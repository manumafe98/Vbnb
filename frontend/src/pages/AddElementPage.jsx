import { AddElementFormComponent } from "../components/AddElementFormComponent";
import { NavBarComponent } from "../components/NavBarComponent";

export const AddElementPage = ({ elementName }) => {
  return (
    <>
      <NavBarComponent/>
      <AddElementFormComponent elementName={ elementName }/>
    </>
  )
}
