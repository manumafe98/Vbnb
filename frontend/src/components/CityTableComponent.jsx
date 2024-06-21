import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Input } from "@nextui-org/react";
import { EditIcon, DeleteIcon, CheckIcon } from "../constants/Icons";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { inputWrapperClassNames } from '../constants/inputWrapperClassNames'

export const CityTableComponent = () => {
  const[cities, setCities] = useState([])
  const[editState, setEditState] = useState({})
  const[tableKey, setTableKey] = useState(0)
  const[newCity, setNewCity] = useState('')
  const[newCountry, setNewCountry] = useState('')
    
  const columns = [
      {name: "ID", uid: "id"},
      {name: "CITY", uid: "name"},
      {name: "COUNTRY", uid: "country"},
      {name: "ACTIONS", uid: "actions"},
  ]

  useEffect(() => {
    getCities()
  }, [])

  const getCities = async () => {
    await useFetch("/backend/api/v1/city", "GET")
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.log(error))
  }
  
  const deleteCity = async (id) => {
    try {
      await useFetch(`/backend/api/v1/city/${id}`, "DELETE")
      setCities(cities.filter(city => city.id !== id))
      getCities()
    } catch(error) {
      console.log(error)
    }
  }
  
  const toggleEditState = (id) => {
    setEditState(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }))
  }

  const handleCityChange = (event) => {
    setNewCity(event.target.value)
  }

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  const updateCity = async (id, city) => {
    setNewCity((currentCity) => {
      if (currentCity !== "") {
        city.name = currentCity
      }
      return currentCity
    })

    setNewCountry((currentCountry) => {
      if (currentCountry !== "") {
        city.country = currentCountry
      }
      return currentCountry
    })

    try {
      await useFetch(`/backend/api/v1/city/${id}`, "PUT", city)
      setEditState(false)
      getCities()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setTableKey(prevKey => prevKey + 1)
  }, [editState])

  const renderCell = React.useCallback((city, columnKey) => {
    const cellValue = city[columnKey]
  
    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        )
      case "name":
        return (
          <>
            {!editState[city.id] ? (
              <div className="flex flex-col">
                <p className="text-bold text-sm">{cellValue}</p>
              </div>
            ) : (
              <Input
                type="text"
                label="City"
                placeholder={cellValue}
                variant="bordered"
                className="table-input"
                classNames={inputWrapperClassNames}
                onChange={handleCityChange}
              />
            )}
          </>
        )
        case "country":
          return (
            <>
              {!editState[city.id] ? (
                <div className="flex flex-col">
                  <p className="text-bold text-sm">{cellValue}</p>
                </div>
              ) : (
                <Input
                  type="text"
                  label="Country"
                  placeholder={cellValue}
                  variant="bordered"
                  className="table-input"
                  classNames={inputWrapperClassNames}
                  onChange={handleCountryChange}
                />
              )}
            </>
          )
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            {editState[city.id] && (
              <Tooltip color="success" content="Update city">
                <span className="text-lg text-success cursor-pointer active:opacity-50">
                  <CheckIcon onClick={() => updateCity(city.id, city)}/>
                </span>
              </Tooltip>
            )}
            <Tooltip content={editState[city.id] ? "Cancel edit" : "Edit city"}>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => toggleEditState(city.id)}/>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete city">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => deleteCity(city.id)}/>
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
      }
    }, [editState])

  return (
    <div className="table-container">
      <Table key={tableKey} aria-label="City table" className="table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={cities}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell className="cell">{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
