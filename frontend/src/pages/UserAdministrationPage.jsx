import React from 'react'
import { NavBarComponent } from '../components/NavBarComponent'
import { UserTableComponent } from '../components/UserTableComponent'

export const UserAdministrationPage = () => {
  return (
    <>
      <NavBarComponent/>
      <UserTableComponent/>
    </>
  )
}
