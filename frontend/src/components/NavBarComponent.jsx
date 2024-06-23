import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button,  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { ChevronDown } from "../constants/Icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export const NavBarComponent = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { auth } = useAuth()

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />
  }

  const logout = () => {
    sessionStorage.removeItem("auth")
    navigate("/")
    window.location.reload()
  }

  return (
    <Navbar maxWidth="full">
      <NavbarBrand as={Link} to="/" className="ms-10">
        <p className="font-bold text-inherit">Vbnb</p>
      </NavbarBrand>
      <NavbarContent justify="center">
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
              aria-label="Add actions"
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
              aria-label="Administrate actions"
              className="w-[120px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="administrate_listings"
                as={Link}
                to="/admin/administrate/listings"
              >
                Listings
              </DropdownItem>
              <DropdownItem
                key="administrate_categories"
                as={Link}
                to="/admin/administrate/categories"
              >
                Categories
              </DropdownItem>
              <DropdownItem
                key="administrate_cities"
                as={Link}
                to="/admin/administrate/cities"
              >
                Cities
              </DropdownItem>
              <DropdownItem
                key="administrate_characteristics"
                as={Link}
                to="/admin/administrate/characteristics"
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
      <NavbarContent justify="end">
      {auth?.user ? (
        <div className="flex items-center gap-4">
          <Dropdown>
            <NavbarItem className="me-10">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  color="warning"
                  as="button"
                  classNames={{
                    base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] capitalize"
                  }}
                  name={auth?.user}
                />
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu variant="flat"aria-label="Profile actions">
            <DropdownItem
                className="h-12 gap-2"
                key="profile"
              >
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{auth?.user}</p>
              </DropdownItem>
            <DropdownItem
                className="h-12 gap-2"
                key="favorites"
              >
                Favorites
              </DropdownItem>
              <DropdownItem
                className="h-14 gap-2"
                key="reserves"
              >
                Reserves
              </DropdownItem>
              <DropdownItem
                className="h-14 gap-2"
                key="logout"
                color="danger"
                onClick={logout}
              >
                Logout
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <>
          {location.pathname === "/" && (
            <>
              <NavbarItem>
                <Button as={Link} to="/auth/signin" color="primary" variant="flat" radius="full" className="bg-[#ff6f00] text-white">
                  Sign In
                </Button>
              </NavbarItem>
              <NavbarItem className="me-10">
                <Button as={Link} to="/auth/signup" color="primary" variant="flat" radius="full" className="bg-[#ff6f00] text-white">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
          {location.pathname === "/auth/signin" && (
            <>
              <NavbarItem className="me-10">
                <Button as={Link} to="/auth/signup" color="primary" variant="flat" radius="full" className="bg-[#ff6f00] text-white">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
          {location.pathname === "/auth/signup" && (
            <>
              <NavbarItem className="me-10">
                <Button as={Link} to="/auth/signin" color="primary" variant="flat" radius="full" className="bg-[#ff6f00] text-white">
                  Sign In
                </Button>
              </NavbarItem>
            </>
          )}
        </>
      )}
      </NavbarContent>
    </Navbar>
  )
}
