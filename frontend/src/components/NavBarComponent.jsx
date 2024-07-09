import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button,  DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar } from "@nextui-org/react";
import { ChevronDownIcon, MobileMenuIcon } from "../constants/Icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { MobileMenuComponent } from "./MobileMenuComponent";
import vbnb_logo from "../static/media/vbnb_logo.png";

export const NavBarComponent = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { auth } = useAuth()
  const[isMenuOpen, setIsMenuOpen] = useState(false)
  const[isMobile, setIsMobile] = useState(false)

  const navPadding = location.pathname === "/listing" ? "pb-4" : "pb-0"
  const navStartMargin = location.pathname === "/listing" ? "2xl:ms-[390px] xl:ms-[225px] lg:ms-10 ms-4 max-[639px]:ms-2" : "2xl:ms-14 xl:ms-14 lg:ms-14 md:ms-14"
  const navEndMargin = location.pathname === "/listing" ? "2xl:me-[390px] xl:me-[225px] lg:me-10 me-4 max-[639px]:me-2" : "2xl:me-14 xl:me-14 lg:me-14 md:me-14"

  const icons = {
    chevron: <ChevronDownIcon fill="currentColor" size={16} />
  }

  const logout = () => {
    sessionStorage.removeItem("auth")
    navigate("/")
    window.location.reload()
  }

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth <= 550)
    }

    checkWidth()
    window.addEventListener("resize", checkWidth)
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

  const showMobileMenu = isMobile && !auth?.user
  const isAdmin = auth?.role === "ADMIN"
  const isUser = auth?.role === "USER"
  const isRootPath = location.pathname === "/"
  const isAdminPath = location.pathname.startsWith("/admin")
  const isListingPath = location.pathname === "/listing"
  const isSignInPath = location.pathname === "/auth/signin"
  const isSignUpPath = location.pathname === "/auth/signup"
  const correctPaths = isRootPath || isListingPath

  return (
    <header>
    <Navbar className={`${navPadding}`} maxWidth="full" isBordered={location.pathname === "/listing"}>
      <NavbarBrand as={Link} to="/"  className={`flex items-center ${navStartMargin}`}>
        <img src={vbnb_logo} alt="Vbnb logo" className="w-16 mt-2.5"/>
        <p className="italic text-xl text-main-orange pl-1 mt-10 max-md:hidden">Vacations like in home</p>
      </NavbarBrand>
      <NavbarContent justify="center">
      {isAdminPath && (
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
            <NavbarItem className={`${navEndMargin} mt-3.5`}>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  color="warning"
                  as="button"
                  classNames={{
                    base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B] capitalize w-12 h-12"
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
              {isAdmin && (
                <DropdownItem
                  className="h-12 gap-2"
                  key="admin_panel"
                  as={Link}
                  to="/admin"
                >
                  Admin Panel
                </DropdownItem>
              )}
              {isUser && (
                <DropdownItem
                  className="h-12 gap-2"
                  key="favorites"
                  as={Link}
                  to="/user/favorites"
                >
                  Favorites
                </DropdownItem>
              )}
              {isUser && (
                <DropdownItem
                  className="h-14 gap-2"
                  key="reserves"
                  as={Link}
                  to="/user/reserves"
                >
                  Reserves
                </DropdownItem>
              )}
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
          {correctPaths && !showMobileMenu && (
            <>
              <NavbarItem className="mt-3.5">
                <Button as={Link} to="/auth/signin" variant="flat" radius="full" className="bg-main-orange text-white">
                  Sign In
                </Button>
              </NavbarItem>
              <NavbarItem className={`${navEndMargin} mt-3.5`}>
                <Button as={Link} to="/auth/signup" variant="flat" radius="full" className="bg-main-orange text-white">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
          {isSignInPath && !showMobileMenu && (
            <>
              <NavbarItem className={`${navEndMargin} mt-3.5`}>
                <Button as={Link} to="/auth/signup" variant="flat" radius="full" className="bg-main-orange text-white">
                  Sign Up
                </Button>
              </NavbarItem>
            </>
          )}
          {isSignUpPath && !showMobileMenu && (
            <>
              <NavbarItem className={`${navEndMargin} mt-3.5`}>
                <Button as={Link} to="/auth/signin" variant="flat" radius="full" className="bg-main-orange text-white">
                  Sign In
                </Button>
              </NavbarItem>
            </>
          )}
          {showMobileMenu && (
            <NavbarItem className="mt-3.5">
              <Button
                onClick={() => setIsMenuOpen(true)}
                className="bg-transparent"
              >
                <MobileMenuIcon className="fill-current text-main-orange w-8 h-8"/>
              </Button>
            </NavbarItem>
          )}
        </>
      )}
      </NavbarContent>
    </Navbar>
    {showMobileMenu && (
      <MobileMenuComponent isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
    )}
    </header>
  )
}
