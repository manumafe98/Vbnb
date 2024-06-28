import React from 'react'
import { NavBarComponent } from '../components/NavBarComponent'
import { FavoriteTabComponent } from '../components/FavoriteTabComponent'
import { FooterComponent } from '../components/FooterComponent'

export const FavoritePage = () => {
  return (
    <>
      <NavBarComponent/>
      <FavoriteTabComponent/>
      <FooterComponent/>
    </>
  )
}
