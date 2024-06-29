import { LayoutComponent } from "../components/LayoutComponent";
import { UpdateCharacteristicFormComponent } from "../components/UpdateCharacteristicFormComponent";
import { useLocation } from "react-router-dom";

export const UpdateCharacteristicPage = () => {
  const location = useLocation()
  const { characteristic } = location.state

  return (
    <LayoutComponent>
      <UpdateCharacteristicFormComponent characteristicToUpdate={characteristic}/>
    </LayoutComponent>
  )
}
