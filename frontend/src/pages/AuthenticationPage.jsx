import { AuthFormComponent } from "../components/AuthFormComponent";
import { NavBarComponent } from "../components/NavBarComponent";

export const AuthenticationPage = ({ authenticationType }) => {
  return (
    <>
      <NavBarComponent/>
      <AuthFormComponent authenticationType={authenticationType}/>
    </>
  )
}
