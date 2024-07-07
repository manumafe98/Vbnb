import { CheckInOutComponent } from "./CheckInOutComponent";
import { Autocomplete, AutocompleteItem, Button} from "@nextui-org/react";
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
  const[checkIn, setCheckIn] = useState(null)
  const[checkOut, setCheckOut] = useState(null)

  useEffect(() => {
    onSearching(listings)
  }, [listings])

  useEffect(() => {
    getListings()
    getCities()
  }, [])

  const getListings = async () => {
    try {
      const response = await useFetch("/backend/api/v1/listing/all", "GET", null, false)
      const data = await response.json()
      const newData = shuffle(data)
      setListings(newData)
    } catch (error) {
      console.log(error)
    }
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

  const getListingByCategory = async (category) => {
    await useFetch(`/backend/api/v1/listing/category/${category}`, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingsByAvailability = async () => {
    const formattedCheckInDate = new Date(checkIn).toISOString().split('T')[0]
    const formattedCheckOutDate = new Date(checkOut).toISOString().split('T')[0]
    const url = `/backend/api/v1/listing/available?checkInDate=${formattedCheckInDate}&checkOutDate=${formattedCheckOutDate}`

    await useFetch(url, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingsByCityAndCategoryNames = async (category) => {
    const url = `/backend/api/v1/listing/by-city-category?cityName=${selectedCity}&categoryName=${category}`

    await useFetch(url, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingsByAvailabilityAndCityName = async () => {
    const formattedCheckInDate = new Date(checkIn).toISOString().split('T')[0]
    const formattedCheckOutDate = new Date(checkOut).toISOString().split('T')[0]
    const url = `/backend/api/v1/listing/available/by-city?cityName=${selectedCity}&checkInDate=${formattedCheckInDate}&checkOutDate=${formattedCheckOutDate}`

    await useFetch(url, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingsByAvailabilityAndCategoryName = async (category) => {
    const formattedCheckInDate = new Date(checkIn).toISOString().split('T')[0]
    const formattedCheckOutDate = new Date(checkOut).toISOString().split('T')[0]
    const url = `/backend/api/v1/listing/available/by-category?categoryName=${category}&checkInDate=${formattedCheckInDate}&checkOutDate=${formattedCheckOutDate}`

    await useFetch(url, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingsByAvailabilityAndCategoryAndCityNames = async (category) => {
    const formattedCheckInDate = new Date(checkIn).toISOString().split('T')[0]
    const formattedCheckOutDate = new Date(checkOut).toISOString().split('T')[0]
    const url = `/backend/api/v1/listing/available/by-category-city?categoryName=${category}&cityName=${selectedCity}&checkInDate=${formattedCheckInDate}&checkOutDate=${formattedCheckOutDate}`

    await useFetch(url, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const handleDates = (checkIn, checkOut) => {
    setCheckIn(checkIn)
    setCheckOut(checkOut)
  }

  const handleSearch = async () => {
    if (selectedCategory && selectedCity && checkIn && checkOut) {
      getListingsByAvailabilityAndCategoryAndCityNames(selectedCategory)
    } else if (selectedCategory && checkIn && checkOut) {
      getListingsByAvailabilityAndCategoryName(selectedCategory)
    } else if (selectedCity && checkIn && checkOut) {
      getListingsByAvailabilityAndCityName()
    } else if (selectedCity && selectedCategory && !checkIn && !checkOut) {
      getListingsByCityAndCategoryNames(selectedCategory)
    } else if (!selectedCategory && !selectedCity && checkIn && checkOut) {
      getListingsByAvailability()
    } else if (selectedCity && !selectedCategory && !checkIn && !checkOut) {
      getListingsByCity()
    } else {
      getListings()
    }
  }

  const getListingsByCategory = async (selectedCategory) => {
    setSelectedCategory(selectedCategory)

    if (selectedCategory && selectedCity && checkIn && checkOut) {
      getListingsByAvailabilityAndCategoryAndCityNames(selectedCategory)
    } else if (selectedCategory && checkIn && checkOut) {
      getListingsByAvailabilityAndCategoryName(selectedCategory)
    } else if (selectedCity && selectedCategory && !checkIn && !checkOut) {
      getListingsByCityAndCategoryNames(selectedCategory)
    } else if (selectedCategory && !selectedCity && !checkIn && !checkOut) {
      getListingByCategory(selectedCategory)
    } else {
      getListings()
    }
  }

  const shuffle = (array) => {
    let currentIndex = array.length;
    while (currentIndex != 0) {
  
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]]
    }

    return array
  }

    return(
      <>
      <section className="flex justify-center border-b-1 border-solid border-main-gray p-5">
          <div className="grid items-center w-[45%] m-1.5 p-1 border-1 border-solid border-main-gray shadow-md search-bar">
            <Autocomplete
              defaultItems={cities}
              radius="full"
              label="Where"
              placeholder="Search destinations"
              labelPlacement="inside"
              className="max-w-xs"
              onSelectionChange={(e) => e ? setSelectedCity(cities[e - 1].name) : setSelectedCity(null)}
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
            <Button radius="full" className="h-14 bg-main-orange text-white" onClick={handleSearch}>
                <SearchIcon/> Search
            </Button>
          </div>
      </section>
      <CategoryFilterComponent onCategorySelection={getListingsByCategory}/>
      </>
    )
}
