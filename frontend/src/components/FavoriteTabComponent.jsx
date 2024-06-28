import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthProvider"
import { useFetch } from "../hooks/useFetch"
import "../styles/FavoriteTabComponent.css"

export const FavoriteTabComponent = () => {
  const[favorites, setFavorites] = useState([])
  const { auth } = useAuth()

  console.log(favorites)

  useEffect(() => {
    getUserFavorites()
  }, [])

  const getUserFavorites = async () => {
    await useFetch(`/backend/api/v1/favorite/${auth.user}`, "GET")
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(error => console.log(error))
  }

  return (
    <section className="favorites-section">
      <ul className="favorites-container">
        {favorites.map((favorite) => (
          <li key={favorite.id.listingId}>
            <div className="max-h-64 flex">
              <img
                className="w-full rounded-md"
                src={favorite.listing.images[0].imageUrl} 
                alt={favorite.listing.title}
              />
            </div>
            <div></div>
          </li>
        ))}
      </ul>
    </section>
  )
}
