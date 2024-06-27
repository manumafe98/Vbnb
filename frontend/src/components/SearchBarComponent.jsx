import { CheckInOutComponent } from "./CheckInOutComponent";
import { Autocomplete, AutocompleteItem, Button} from "@nextui-org/react";
import "../styles/SearchBarComponent.css";
import { SearchIcon } from "../constants/Icons";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { LocationIcon } from "../constants/Icons";
import { CategoryFilterComponent } from "./CategoryFilterComponent";

export const SearchBarComponent = ({ onSearching }) => {
  const[cities, setCities] = useState([])
  const[listings, setListings] = useState([])
  const[selectedCity, setSelectedCity] = useState('')
  const[selectedCategory, setSelectedCategory] = useState('')
  const[checkIn, setCheckIn] = useState(new Date())
  const[checkOut, setCheckOut] = useState(new Date())

  useEffect(() => {
    onSearching(listings)
  }, [listings])

  useEffect(() => {
    getListings()
    getCities()
  }, [])

  const getListings = async () => {
    await useFetch("/backend/api/v1/listing/all", "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getCities = async () => {

    await useFetch("/backend/api/v1/city/all", "GET", null, false)
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.log(error))
  }

  const getListingsByCity = async () => {
    await useFetch(`/backend/api/v1/listing/city/${selectedCity}`, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingsByAvailability = async () => {
    const formattedCheckInDate = checkIn.toISOString().split('T')[0]
    const formattedCheckOutDate = checkOut.toISOString().split('T')[0]

    await useFetch(`/backend/api/v1/listing/available?checkInDate=${formattedCheckInDate}&checkOutDate=${formattedCheckOutDate}`, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingsByAvailabilityAndCityName = async () => {
    const formattedCheckInDate = checkIn.toISOString().split('T')[0]
    const formattedCheckOutDate = checkOut.toISOString().split('T')[0]

    await useFetch(`/backend/api/v1/listing/available/${selectedCity}?checkInDate=${formattedCheckInDate}&checkOutDate=${formattedCheckOutDate}`, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const handleDates = (checkIn, checkOut) => {
    setCheckIn(new Date(checkIn))
    setCheckOut(new Date(checkOut))
  }

  const handleSearch = async () => {
    if (selectedCity && !isNaN(checkIn) && !isNaN(checkOut)) {
      getListingsByAvailabilityAndCityName()
    } else if (!selectedCity && !isNaN(checkIn) && !isNaN(checkOut)) {
      getListingsByAvailability()
    } else if (selectedCity && isNaN(checkIn) && isNaN(checkOut)) {
      getListingsByCity()
    } else {
      getListings()
    }
  }

  const getListingsByCategory = async (selectedCategory) => {
    setSelectedCategory(selectedCategory)

    if (selectedCategory === "All") {
      getListings()
    } else {
      await useFetch(`/backend/api/v1/listing/category/${selectedCategory}`, "GET", null, false)
        .then(response => response.json())
        .then(data => setListings(data))
        .catch(error => console.log(error))
    }
  }

    return(
      <>
      <section className="search">
          <div className="search-bar">
            <Autocomplete
              defaultItems={cities}
              radius="full"
              label="Where"
              placeholder="Search destinations"
              labelPlacement="inside"
              className="max-w-xs"
              onSelectionChange={(e) => e ? setSelectedCity(cities[e - 1].name) : setSelectedCity('')}
            >
              {(city) => (
                <AutocompleteItem key={city.id} textValue={city.name}>
                  <div className="flex gap-2 items-center">
                    <LocationIcon/>
                    <div className="flex flex-col">
                      <span className="text-small">{city.name}</span>
                      <span className="text-tiny text-default-400">{city.country}</span>
                    </div>
                  </div>
                </AutocompleteItem>
              )}
            </Autocomplete>
            <CheckInOutComponent onDate={handleDates}/>
            <Button radius="full" className="h-14 bg-[#ff6f00] text-white" onClick={handleSearch}>
                <SearchIcon/> Search
            </Button>
          </div>
      </section>
      <CategoryFilterComponent onCategorySelection={getListingsByCategory}/>
      </>
    )
}
