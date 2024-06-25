import { ListingComponent } from "./ListingComponent";

export const ListingSectionComponent = ({ listings }) => {

  return (
    <section className="listings">
      <div className="py-3 sm:py-5 me-20 ms-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {listings.map((listing) => (
            <ListingComponent
              key={listing.id}
              title={listing.title}
              image={listing.images[0].imageUrl}
              description={listing.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
