import { CheckInOutComponent } from "./CheckInOutComponent";
import { Autocomplete, AutocompleteItem, Button} from "@nextui-org/react";
import { SearchIcon } from "../constants/Icons";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { LocationIcon } from "../constants/Icons";
import { CategoryFilterComponent } from "./CategoryFilterComponent";
import { autocompleteInputWrapperClassNames } from "../constants/autocompleteInputWrapperClassNames";

export const SearchBarComponent = ({ onSearching }) => {
  const[cities, setCities] = useState([])
  const[listings, setListings] = useState([])
  const[selectedCity, setSelectedCity] = useState('')
  const[selectedCategory, setSelectedCategory] = useState('')
  const[checkIn, setCheckIn] = useState(null)
  const[checkOut, setCheckOut] = useState(null)
  const[radius, setRadius] = useState("full")
  const[variant, setVariant] = useState("flat")

  const shuffle = (array) => {
    const copiedArray = [...array]
    for (let index = copiedArray.length - 1; index > 0; index--) {
      const randomIndex = Math.floor(Math.random() * (index + 1))
      console.log('Swapping:', copiedArray[index], copiedArray[randomIndex])
      [copiedArray[index], copiedArray[randomIndex]] = [copiedArray[randomIndex], copiedArray[index]]
    }
    return copiedArray
  }

  useEffect(() => {
    onSearching(listings)
  }, [listings])

  useEffect(() => {
    getListings()
    getCities()
  }, [])

  const getListings = async () => {
    try {
      const response = await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/listing/all`, "GET", null, false)
      const data = await response.json()
      console.log(data)
      const newData = shuffle(data)
      console.log(newData)
      setListings(newData)
    } catch (error) {
      console.log(error)
    }
  }

  const getCities = async () => {
    await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/city/all`, "GET", null, false)
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.log(error))
  }

  const getListingsByCity = async () => {
    await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/listing/city/${selectedCity}`, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingByCategory = async (category) => {
    await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/listing/category/${category}`, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingsByAvailability = async () => {
    const formattedCheckInDate = new Date(checkIn).toISOString().split("T")[0]
    const formattedCheckOutDate = new Date(checkOut).toISOString().split("T")[0]
    const url = `${import.meta.env.BACKEND_URL}/api/v1/listing/available?checkInDate=${formattedCheckInDate}&checkOutDate=${formattedCheckOutDate}`

    await useFetch(url, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingsByCityAndCategoryNames = async (category) => {
    const url = `${import.meta.env.BACKEND_URL}/api/v1/listing/by-city-category?cityName=${selectedCity}&categoryName=${category}`

    await useFetch(url, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingsByAvailabilityAndCityName = async () => {
    const formattedCheckInDate = new Date(checkIn).toISOString().split("T")[0]
    const formattedCheckOutDate = new Date(checkOut).toISOString().split("T")[0]
    const url = `${import.meta.env.BACKEND_URL}/api/v1/listing/available/by-city?cityName=${selectedCity}&checkInDate=${formattedCheckInDate}&checkOutDate=${formattedCheckOutDate}`

    await useFetch(url, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingsByAvailabilityAndCategoryName = async (category) => {
    const formattedCheckInDate = new Date(checkIn).toISOString().split("T")[0]
    const formattedCheckOutDate = new Date(checkOut).toISOString().split("T")[0]
    const url = `${import.meta.env.BACKEND_URL}/api/v1/listing/available/by-category?categoryName=${category}&checkInDate=${formattedCheckInDate}&checkOutDate=${formattedCheckOutDate}`

    await useFetch(url, "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const getListingsByAvailabilityAndCategoryAndCityNames = async (category) => {
    const formattedCheckInDate = new Date(checkIn).toISOString().split("T")[0]
    const formattedCheckOutDate = new Date(checkOut).toISOString().split("T")[0]
    const url = `${import.meta.env.BACKEND_URL}/api/v1/listing/available/by-category-city?categoryName=${category}&cityName=${selectedCity}&checkInDate=${formattedCheckInDate}&checkOutDate=${formattedCheckOutDate}`

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 639) {
        setRadius("md")
        setVariant("bordered")
      } else {
        setRadius("full")
        setVariant("flat")
      }
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

    return(
      <>
      <section className="max-sm:border-y max-sm:bg-[#F9F9F9] max-sm:my-5 flex justify-center border-b border-solid border-main-gray p-5">
          <div className="grid grid-cols-[1fr_1fr_0.65fr] items-center border-1 border-solid border-main-gray shadow-md rounded-full m-1.5 p-1 2xl:w-[45%] xl:w-[50%] lg:w-[60%] md:w-[75%] max-sm:w-full max-sm:flex max-sm:flex-col max-sm:border-0 max-sm:shadow-none max-sm:items-stretch">
            <Autocomplete
              defaultItems={cities}
              radius={radius}
              variant={variant}
              label="Where"
              placeholder="Search destinations"
              labelPlacement="inside"
              className="sm:w-full max-sm:mb-2"
              inputProps={autocompleteInputWrapperClassNames}
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
            <CheckInOutComponent onDate={handleDates} radius={radius} variant={variant}/>
            <Button radius={radius} className="h-14 bg-main-orange text-white" onClick={handleSearch}>
                <SearchIcon/> Search
            </Button>
          </div>
      </section>
      <CategoryFilterComponent onCategorySelection={getListingsByCategory}/>
      </>
    )
}
