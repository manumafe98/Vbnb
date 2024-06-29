import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Avatar, Input } from "@nextui-org/react";
import { DeleteIcon, EditIcon, CheckIcon } from "../constants/Icons";
import { useFetch } from "../hooks/useFetch";
import { inputWrapperClassNames } from "../constants/inputWrapperClassNames";
import { Link } from "react-router-dom";

export const ElementTableComponent = ({ elementName }) => {
    const[elements, setElements] = useState([])
    const[tableKey, setTableKey] = useState(0)
    const[editState, setEditState] = useState({})
    const[newCity, setNewCity] = useState('')
    const[newCountry, setNewCountry] = useState('')

    let columns = []

    if (elementName === "city") {
      columns = [
        {name: "ID", uid: "id"},
        {name: "CITY", uid: "name"},
        {name: "COUNTRY", uid: "country"},
        {name: "ACTIONS", uid: "actions"},
      ]
    } else {
      columns = [
        {name: "ID", uid: "id"},
        {name: "IMAGE", uid: "imageUrl"},
        {name: `${elementName.toUpperCase()}`, uid: "name"},
        {name: "ACTIONS", uid: "actions"},
      ]
    }

    useEffect(() => {
      getElements()
    }, [elementName])

    const getElements = async () => {
      await useFetch(`/backend/api/v1/${elementName}/all`, "GET", null, false)
        .then(response => response.json())
        .then(data => setElements(data))
        .catch(error => console.log(error))
    }

    const deleteElement = async (id) => {
      try {
        await useFetch(`/backend/api/v1/${elementName}/${id}`, "DELETE")
        getElements()
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
        getElements()
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      setTableKey(prevKey => prevKey + 1)
    }, [elementName, editState])

    const renderCell = React.useCallback((element, columnKey) => {
      const cellValue = element[columnKey]

      switch (columnKey) {
        case "id":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-sm">{cellValue}</p>
            </div>
          )
        case "imageUrl":
            return (
              <div className="relative flex items-center">
                <Avatar src={cellValue} size="md" />
              </div>
            )
        case "name":
          return (
            <>
              {elementName === "city" ? (
                !editState[element.id] ? (
                  <div className="flex flex-col">
                    <p className="text-bold text-sm">{cellValue}</p>
                  </div>
                ) : (
                  <Input
                    type="text"
                    label="City"
                    placeholder={cellValue}
                    variant="bordered"
                    className="w-[20%]"
                    classNames={inputWrapperClassNames}
                    onChange={handleCityChange}
                  />
                )
              ) : (
                <div className="flex flex-col">
                  <p className="text-bold text-sm">{cellValue}</p>
                </div>
              )}
            </>
          )
          case "country":
            return (
              <>
                {!editState[element.id] ? (
                  <div className="flex flex-col">
                    <p className="text-bold text-sm">{cellValue}</p>
                  </div>
                ) : (
                  <Input
                    type="text"
                    label="Country"
                    placeholder={cellValue}
                    variant="bordered"
                    className="w-[20%]"
                    classNames={inputWrapperClassNames}
                    onChange={handleCountryChange}
                  />
                )}
              </>
            )
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              {elementName === "city" ? (
                <>
                  {editState[element.id] && (
                    <Tooltip color="success" content="Update city">
                      <span className="text-lg text-success cursor-pointer active:opacity-50">
                        <CheckIcon onClick={() => updateCity(element.id, element)}/>
                      </span>
                    </Tooltip>
                  )}
                  <Tooltip content={editState[element.id] ? "Cancel edit" : "Edit city"}>
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon onClick={() => toggleEditState(element.id)}/>
                    </span>
                  </Tooltip>
                </>
              ) : (
                <>
                  {elementName === "characteristic" && (
                    <Tooltip content={`Edit ${elementName}`}>
                      <Link
                        to="/admin/update/characteristics"
                        state={{ characteristic: element }}
                        className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon/>
                      </Link>
                    </Tooltip>
                  )}
                </>
              )}
              <Tooltip color="danger" content={`Delete ${elementName}`}>
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon onClick={() => deleteElement(element.id)}/>
                </span>
              </Tooltip>
            </div>
          )
        default:
          return cellValue
        }
      }, [elementName, editState])

  return (
    <div className="flex justify-center">
      <Table key={tableKey} aria-label={`${elementName} table`} className="w-[70%] mt-2">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={elements}>
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
