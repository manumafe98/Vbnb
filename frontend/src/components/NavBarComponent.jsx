import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

export const NavBarComponent = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Vbnb</p>
      </NavbarBrand>
      <NavbarContent justify="end">
      <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat" radius="full" className="bg-[#ff6f00] text-white">
            Sign In
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat" radius="full" className="bg-[#ff6f00] text-white">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
