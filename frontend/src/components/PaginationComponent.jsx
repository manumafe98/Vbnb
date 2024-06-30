import { Pagination } from "@nextui-org/react";

export const PaginationComponent = ({ totalListings, listingsPerPage, setCurrentPage }) => {
    const totalPages = Math.ceil(totalListings / listingsPerPage)

  return (
    <div className="flex justify-center items center pt-4">
      <Pagination 
        initialPage={1} 
        total={totalPages} 
        onChange={setCurrentPage}
        classNames={{
          cursor: "bg-main-orange"
        }}
      />
    </div>
  )
}
