import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button,  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from "@nextui-org/react";
import { ChevronDown } from "../constants/Icons";
import { Link, useLocation } from "react-router-dom"

export const NavBarComponent = () => {
  const location = useLocation();

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />
  }

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Vbnb</p>
      </NavbarBrand>
      <NavbarContent justify="end">
      {location.pathname === "/" && (
        <>
          <NavbarItem>
            <Button as={Link} to="/auth/signin" color="primary" variant="flat" radius="full" className="bg-[#ff6f00] text-white">
              Sign In
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} to="/auth/signup" color="primary" variant="flat" radius="full" className="bg-[#ff6f00] text-white">
              Sign Up
            </Button>
          </NavbarItem>
        </>
      )}
      {location.pathname === "/auth/signin" && (
        <>
          <NavbarItem>
            <Button as={Link} to="/auth/signup" color="primary" variant="flat" radius="full" className="bg-[#ff6f00] text-white">
              Sign Up
            </Button>
          </NavbarItem>
        </>
      )}
      {location.pathname === "/auth/signup" && (
        <>
          <NavbarItem>
            <Button as={Link} to="/auth/signin" color="primary" variant="flat" radius="full" className="bg-[#ff6f00] text-white">
              Sign In
            </Button>
          </NavbarItem>
        </>
      )}
      {location.pathname.startsWith("/admin") && (
        <>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={icons.chevron}
                  radius="sm"
                  variant="light"
                >
                  Add
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[120px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="add_listing"
                as={Link}
                to="/admin/add/listing"
              >
                Listing
              </DropdownItem>
              <DropdownItem
                key="add_category"
                as={Link}
                to="/admin/add/category"
              >
                Category
              </DropdownItem>
              <DropdownItem
                key="add_city"
                as={Link}
                to="/admin/add/city"
              >
                City
              </DropdownItem>
              <DropdownItem
                key="add_characteristic"
                as={Link}
                to="/admin/add/characteristic"                
              >
                Characteristic
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  endContent={icons.chevron}
                  radius="sm"
                  variant="light"
                >
                  Administrate
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[120px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="administrate_listings"
              >
                Listings
              </DropdownItem>
              <DropdownItem
                key="administrate_categories"
              >
                Categories
              </DropdownItem>
              <DropdownItem
                key="administrate_cities"
              >
                Cities
              </DropdownItem>
              <DropdownItem
                key="administrate_characteristics"
              >
                Characteristics
              </DropdownItem>
              <DropdownItem
                key="administrate_users"
                as={Link}
                to="/admin/administrate/users"
              >
                Users
              </DropdownItem>              
            </DropdownMenu>
          </Dropdown>          
        </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
