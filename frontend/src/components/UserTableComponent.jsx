import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Tooltip, Select, SelectItem } from "@nextui-org/react";
import { EditIcon, DeleteIcon, CheckIcon } from "../constants/Icons";
import { useState, useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { selectTriggerClassNames } from "../constants/selectTriggerClassNames";

export const UserTableComponent = () => {
  const[users, setUsers] = useState([])
  const[editState, setEditState] = useState({})
  const[tableKey, setTableKey] = useState(0)
  const[newRole, setNewRole] = useState('')

  const columns = [
    {name: "NAME", uid: "name"},
    {name: "ROLE", uid: "role"},
    {name: "ACTIONS", uid: "actions"},
  ]

  const roles = [
    {name: "admin", uid: "ADMIN"},
    {name: "user", uid: "USER"},
  ]

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    await useFetch("/backend/api/v1/user/all", "GET")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error))
  }

  const deleteUser = async (id) => {
    try {
      await useFetch(`/backend/api/v1/user/delete/${id}`, "DELETE")
      setUsers(users.filter(user => user.id !== id))
      getUsers()
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

  const handleChange = (event) => {
    setNewRole(event.target.value.split(".")[1] === "0" ? "ADMIN" : "USER")
  }

  const updateUser = async (id, user) => {
    setNewRole((currentRole) => {
      user.role = currentRole
      return currentRole
    })

    try {
      await useFetch(`/backend/api/v1/user/update/${id}?userRole=${user.role}`, "PUT", user)
      setEditState(false)
      getUsers()

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setTableKey(prevKey => prevKey + 1)
  }, [editState])

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case "name":
        return (
          <User
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        )
      case "role":
        return (
          <>
            {!editState[user.id] ? (
              <div className="flex flex-col">
                <p className="text-bold text-sm">{cellValue.toLowerCase()}</p>
              </div>
            ) : (
              <Select
                label="Role"
                variant="bordered"
                className="user-role-select"
                classNames={selectTriggerClassNames}
                placeholder={cellValue.toLowerCase()}
                onChange={handleChange}
              >
                {roles.map(role => (
                  <SelectItem key={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </Select>
            )}
          </>
        )
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            {editState[user.id] && (
              <Tooltip color="success" content="Update user">
                <span className="text-lg text-success cursor-pointer active:opacity-50">
                  <CheckIcon onClick={() => updateUser(user.id, user)}/>
                </span>
              </Tooltip>
            )}
            <Tooltip content={editState[user.id] ? "Cancel edit" : "Edit user"}>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => toggleEditState(user.id)}/>
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => deleteUser(user.id)}/>
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
      <Table key={tableKey} aria-label="User table" className="table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={users}>
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
