import { ListingComponent } from "./ListingComponent";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";

export const ListingSectionComponent = ({ listings }) => {
  const [ratings, setRatings] = useState({})

  useEffect(() => {
    fetchRatings()
  }, [listings])

  const fetchRatings = async () => {
    const ratingsMap = {}
    for (const listing of listings) {
      const rating = await getListingRating(listing.id)
      ratingsMap[listing.id] = rating
    }
    setRatings(ratingsMap)
  }

  const getListingRating = async (id) => {
    const response = await useFetch(`/backend/api/v1/rating/average/${id}`, "GET", null, false)
    const data = await response.json()

    return data.rating
  }

  return (
    <section className="listings">
      <div className="py-3 sm:py-5 me-20 ms-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {listings.map((listing) => (
            <ListingComponent
              key={listing.id}
              id={listing.id}
              title={listing.title}
              images={listing.images}
              description={listing.description}
              rating={ratings[listing.id] !== undefined ? ratings[listing.id] : null}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
