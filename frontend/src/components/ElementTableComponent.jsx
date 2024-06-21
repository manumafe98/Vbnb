import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Avatar } from "@nextui-org/react";
import { DeleteIcon, EditIcon } from "../constants/Icons";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";

export const ElementTableComponent = ({ elementName }) => {
    const[elements, setElements] = useState([])
    const[tableKey, setTableKey] = useState(0)

    const columns = [
        {name: "ID", uid: "id"},
        {name: "IMAGE", uid: "imageUrl"},
        {name: `${elementName.toUpperCase()}`, uid: "name"},
        {name: "ACTIONS", uid: "actions"},
    ]

    useEffect(() => {
      getElements()
    }, [elementName])

    const getElements = async () => {
      await useFetch(`/backend/api/v1/${elementName}`, "GET")
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

    useEffect(() => {
      setTableKey(prevKey => prevKey + 1)
    }, [elementName])

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
            <div className="flex flex-col">
              <p className="text-bold text-sm">{cellValue}</p>
            </div>
          )
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              {elementName === "characteristic" && (
                <>
                  <Tooltip content={`Edit ${elementName}`}>
                    <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                      <EditIcon />
                    </span>
                  </Tooltip>
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
      }, [elementName])

  return (
    <div className="table-container">
      <Table key={tableKey} aria-label={`${elementName} table`} className="table">
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
