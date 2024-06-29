import React, { useState, useEffect } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip, Avatar } from "@nextui-org/react";
import { EditIcon, DeleteIcon } from "../constants/Icons";
import { useFetch } from "../hooks/useFetch";
import { Link } from "react-router-dom";

export const ListingTableComponent = () => {
  const[listings, setListings] = useState([])

  const columns = [
    {name: "ID", uid: "id"},
    {name: "TITLE", uid: "title"},
    {name: "DESCRIPTION", uid: "description"},
    {name: "CATEGORY", uid: "category"},
    {name: "CITY", uid: "city"},
    {name: "IMAGES", uid: "images"},
    {name: "CHARACTERISTICS", uid: "characteristics"},
    {name: "ACTIONS", uid: "actions"},
  ]

  useEffect(() => {
    getListings()
  }, [])

  const getListings = async () => {
    await useFetch("/backend/api/v1/listing/all", "GET", null, false)
      .then(response => response.json())
      .then(data => setListings(data))
      .catch(error => console.log(error))
  }

  const deleteListing = async (id) => {
    try {
      await useFetch(`/backend/api/v1/listing/delete/${id}`, "DELETE")
      getListings()
    } catch(error) {
      console.log(error)
    }
  }

  const renderCell = React.useCallback((listing, columnKey) => {
    const cellValue = listing[columnKey]

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        )
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        )
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue}</p>
          </div>
        )
      case "category":
        return (
          <div className="relative flex items-center">
            <Avatar src={cellValue.imageUrl} size="md" />
          </div>
        )
      case "city":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{cellValue.name}</p>
          </div>
        )
      case "images":
        return (
          <div className="relative flex items-center gap-2">
            {cellValue.map((image) => (
              <Avatar key={image.id} src={image.imageUrl} size="md" />
            ))}
          </div>
        )
      case "characteristics":
        return (
          <div className="relative flex items-center gap-2">
            {cellValue.map((characteristic) => (
              <Avatar key={characteristic.id} src={characteristic.imageUrl} size="md" />
            ))}
          </div>
        )
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit listing">
              <Link
                to="/admin/update/listings"
                state={{ listing }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon/>
              </Link>
            </Tooltip>
            <Tooltip color="danger" content="Delete listing">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => deleteListing(listing.id)}/>
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <div className="flex justify-center">
      <Table aria-label="Listing table" className="w-[70%] mt-2">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={listings}>
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
