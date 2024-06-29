import { LayoutComponent } from "../components/LayoutComponent";
import { NotFoundComponent } from "../components/NotFoundComponent";

export const MissingPage = () => {
  return (
    <LayoutComponent>
      <NotFoundComponent/>
    </LayoutComponent>
  )
}
