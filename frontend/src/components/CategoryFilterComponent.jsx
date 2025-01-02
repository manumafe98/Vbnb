import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { CarouselLeftArrowIcon, CarouselRigthArrowIcon } from "../constants/Icons";
import { useFetch } from "../hooks/useFetch";

const CustomRightArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-5 transform translate-x-full mr-2 hover:main-orange hover:text-main-orange"
    aria-label="Go to next slide"
  >
    <CarouselRigthArrowIcon className="h-6 w-6"/>
  </button>
)

const CustomLeftArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-5 transform -translate-x-full ml-2 hover:text-main-orange"
    aria-label="Go to previous slide"
  >
    <CarouselLeftArrowIcon className="h-6 w-6"/>
  </button>
)

export const CategoryFilterComponent = ({ onCategorySelection }) => {
  const[categories, setCategories] = useState([])
  const[selectedCategory, setSelectedCategory] = useState('')

  const responsive = {
    superLarge: {
      breakpoint: { max: 4000, min: 990 },
      items: 12
    },
    desktop: {
      breakpoint: { max: 990, min: 767 },
      items: 8
    },
    tablet: {
      breakpoint: { max: 767, min: 639 },
      items: 6
    },
    smallTablet: {
      breakpoint: { max: 639, min: 470 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 470, min: 0 },
      items: 3
    }
  };

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    onCategorySelection(selectedCategory)
  }, [selectedCategory])

  const getCategories = async () => {
    await useFetch("/backend/api/v1/category/all", "GET", null, false)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log(error))
  }

  const handleClick = (event) => {
    const category = event.currentTarget.dataset.value
    setSelectedCategory(category === "All" ? null : category)
  }

  return (
    <section className="category-filters mt-5 2xl:mx-20 xl:mx-20 lg:mx-20 md:mx-20 sm:mx-6 max-[639px]:mx-6">
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        infinite={false}
        keyBoardControl={true}
        customTransition="transform 300ms ease-in-out"
        transitionDuration={300}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
      >
        {categories.map((category) => (
          <div key={category.id} className="px-1">
            <span
              data-value={category.name}
              className="flex flex-col items-center box-border group hover:underline hover:scale-110 focus:font-bold hover:text-main-orange cursor-pointer"
              onClick={handleClick}
            >
              <img 
                src={category.imageUrl} 
                alt={category.name} 
                className="inline-block align-middle h-7 w-7 transition duration-300 ease-in-out p-0.5"
              />
              <div className="mt-1 opacity-75 text-small">
                {category.name}
              </div>
            </span>
          </div>
        ))}
      </Carousel>
    </section>
  )
}
