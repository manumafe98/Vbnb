import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import Carousel from "react-grid-carousel";

export const CategoryFilterComponent = ({ onCategorySelection }) => {
  const[categories, setCategories] = useState([])
  const[selectedCategory, setSelectedCategory] = useState('')

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
    <section className="category-filters mt-5 me-20 ms-20">
      <Carousel 
        cols={12} 
        rows={1} 
        gap={1}
        responsiveLayout={[
          {
            breakpoint: 990,
            cols: 8
          },
          {
            breakpoint: 767,
            cols: 6
          },
          {
            breakpoint: 639,
            cols: 4
          },
          {
            breakpoint: 470,
            cols: 3
          }
        ]}
        mobileBreakpoint={300}>
        {categories.map((category) => (
          <Carousel.Item key={category.id}>
            <span
              key={category.name}
              data-value={category.name}
              className="flex flex-col items-center box-border group hover:underline hover:scale-110 focus:font-bold hover:text-main-orange cursor-pointer"
              onClick={handleClick}
            >
              <img src={category.imageUrl} alt={category.name} className="inline-block align-middle h-7 w-7 transition duration-300 ease-in-out p-0.5"/>
              <div className="mt-1 opacity-75 text-small">{category.name}</div>
            </span>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  )
}
