import { CheckInOutComponent } from "./CheckInOutComponent";
import { Autocomplete, AutocompleteItem, Button} from "@nextui-org/react";
import "../styles/SearchBarComponent.css";
import { Search } from "../constants/Icons";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { LocationIcon } from "../constants/Icons";

export const SearchBarComponent = () => {
  const[cities, setCities] = useState([])

  useEffect(() => {
    getCities()
  }, [])

  const getCities = async () => {

    await useFetch("/backend/api/v1/city/all", "GET", null, false)
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.log(error))
  }

    return(
        <section className="search">
            <div className="search-bar">
              <Autocomplete
                defaultItems={cities}
                radius="full"
                label="Where"
                placeholder="Search destinations"
                labelPlacement="inside"
                className="max-w-xs"
              >
                {(city) => (
                  <AutocompleteItem key={cities[city]} textValue={city.name}>
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
              <CheckInOutComponent/>
              <Button radius="full" className="h-14 bg-[#ff6f00] text-white">
                  <Search/> Search
              </Button>
            </div>
        </section>
    )
}
