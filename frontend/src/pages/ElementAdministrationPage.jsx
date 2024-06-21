import { ElementTableComponent } from "../components/ElementTableComponent"
import { NavBarComponent } from "../components/NavBarComponent"

export const ElementAdministrationPage = ({ elementName }) => {
  return (
    <>
      <NavBarComponent/>
      <ElementTableComponent elementName={elementName}/>
    </>
  )
}
