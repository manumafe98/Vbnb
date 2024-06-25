import { Image } from "@nextui-org/image";
import { FavoriteIcon } from "../constants/Icons";

export const ListingComponent = ({ title, image, description }) => {
  return (
    <div className="listings-data relative">
      <FavoriteIcon className="transition-transform duration-300 group-hover:scale-110"/>
      <Image
        alt={title}
        src={image}
        className="max-h-64 w-full z-1"
        classNames={{ wrapper: "!max-w-none" }}
      />
      <div className="pt-3 flex justify-between items-start">
        <div className="title">
          <p className="max-w-[17rem] font-semibold text-[17px]">
            {title}
          </p>
          <p className="max-w-[17rem] text-[16px] -mt-1 text-gray-500">
            {description} 
          </p>
        </div>
      </div>
    </div>
  )
}
