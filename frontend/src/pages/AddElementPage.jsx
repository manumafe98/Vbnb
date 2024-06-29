import { AddElementFormComponent } from "../components/AddElementFormComponent";
import { LayoutComponent } from "../components/LayoutComponent";

export const AddElementPage = ({ elementName }) => {
  return (
    <LayoutComponent>
      <AddElementFormComponent elementName={ elementName }/>
    </LayoutComponent>
  )
}
