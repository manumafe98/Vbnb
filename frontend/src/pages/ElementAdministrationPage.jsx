import { ElementTableComponent } from "../components/ElementTableComponent";
import { LayoutComponent } from "../components/LayoutComponent";

export const ElementAdministrationPage = ({ elementName }) => {
  return (
    <LayoutComponent>
      <ElementTableComponent elementName={elementName}/>
    </LayoutComponent>
  )
}
