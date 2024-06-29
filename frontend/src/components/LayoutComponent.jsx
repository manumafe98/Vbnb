import { FooterComponent } from "./FooterComponent"
import { NavBarComponent } from "./NavBarComponent"

export const LayoutComponent = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBarComponent/>
        {children}
      <FooterComponent/>
    </div>
  )
}
