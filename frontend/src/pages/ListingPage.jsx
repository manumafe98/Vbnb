import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { LayoutComponent } from "../components/LayoutComponent";
import { ListingTabComponent } from "../components/ListingTabComponent";
import { useFetch } from "../hooks/useFetch";

export const ListingPage = () => {
  const location = useLocation()
  const { id } = useParams()
  const[listing, setListing] = useState(location.state?.listing || null)

    useEffect(() => {
      const fetchListing = async () => {
        if (!listing) {
          try {
            const response = await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/listing/get/${id}`, "GET", null, false)
            const data = await response.json()
            setListing(data)
          } catch (error) {
            console.log(error)
          }
        }
      }
      fetchListing()
    }, [listing, id])

    if (!listing) {
      return <></>
  }

  return (
    <LayoutComponent>
        <ListingTabComponent listing={listing}/>
    </LayoutComponent>
  )
}
