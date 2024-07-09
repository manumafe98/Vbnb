import { ListingCardComponent } from "./ListingCardComponent";
import { useFetch } from "../hooks/useFetch";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { PopUpNotificationComponent } from "./PopUpNotificationComponent";
import { PaginationComponent } from "./PaginationComponent";

export const ListingSectionComponent = ({ listings }) => {
  const[ratings, setRatings] = useState({})
  const[showPopup, setShowPopup] = useState(false)
  const[popupData, setPopupData] = useState({ message: "", action: "", type: "" })
  const[currentPage, setCurrentPage] = useState(1)
  const[listingsPerPage, setListingsPerPage] = useState(12)
  const { auth } = useAuth()

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
    try {
      const response = await useFetch(`/backend/api/v1/rating/info/${id}`, "GET", null, false)
      const data = await response.json()

      return data
    } catch (error) {
      console.log(error)
    }
  }

  const handlePopUp = (message, action, type) => {
    setShowPopup(true)
    setPopupData({ message, action, type })
    setTimeout(() => setShowPopup(false), 7500)
  }

  const addListingToFavorite = async (selectedListing) => {
    try {
      const response = await useFetch(`/backend/api/v1/favorite?userEmail=${auth.user}&listingId=${selectedListing}`, "POST", null, true)
      handlePopUp("Added to Favorites", "View Favorites",  "success")

      if (!response.ok) {
        handlePopUp("Already added to Favorites", "View Favorites", "error")
      }

    } catch (error) {
      console.log(error)
    }
  }

  const lastPostIndex = currentPage * listingsPerPage
  const firstPostIndex = lastPostIndex - listingsPerPage
  const currentListings = listings.slice(firstPostIndex, lastPostIndex)

  return (
    <section className="listings">
      <div className="py-3 sm:py-5 2xl:mx-20 xl:mx-20 lg:mx-20 md:mx-20 sm:mx-6 max-[639px]:mx-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {currentListings.map((listing) => (
            <ListingCardComponent
              key={listing.id}
              id={listing.id}
              title={listing.title}
              images={listing.images}
              description={listing.description}
              rating={ratings[listing.id] !== undefined ? ratings[listing.id].rating : null}
              onFavoriteSelection={addListingToFavorite}
            />
          ))}
        </div>
        <PaginationComponent totalListings={listings.length} listingsPerPage={listingsPerPage} setCurrentPage={setCurrentPage}/>
        {showPopup && <PopUpNotificationComponent message={popupData.message} action={popupData.action} type={popupData.type}/>}
      </div>
    </section>
  )
}
