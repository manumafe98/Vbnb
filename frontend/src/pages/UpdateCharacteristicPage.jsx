import { NavBarComponent } from "../components/NavBarComponent";
import { UpdateCharacteristicFormComponent } from "../components/UpdateCharacteristicFormComponent";
import { useLocation } from "react-router-dom";

export const UpdateCharacteristicPage = () => {
  const location = useLocation()
  const { characteristic } = location.state

  return (
    <>
      <NavBarComponent/>
      <UpdateCharacteristicFormComponent characteristicToUpdate={characteristic}/>
    </>
  )
}
