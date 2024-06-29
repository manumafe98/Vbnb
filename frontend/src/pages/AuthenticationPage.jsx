import { AuthFormComponent } from "../components/AuthFormComponent";
import { LayoutComponent } from "../components/LayoutComponent";

export const AuthenticationPage = ({ authenticationType }) => {
  return (
    <LayoutComponent>
      <AuthFormComponent authenticationType={authenticationType}/>
    </LayoutComponent>
  )
}
