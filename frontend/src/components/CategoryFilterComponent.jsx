import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";

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
    <section className="category-filters">
      <div className="flex justify-center gap-40 mt-5">
        {categories.map((category) => (
          <span
            key={category.name}
            data-value={category.name}
            className="flex flex-col items-center box-border group hover:underline hover:scale-110 focus:font-bold hover:text-orange-500 cursor-pointer"
            onClick={handleClick}
          >
            <img src={category.imageUrl} alt={category.name} className="inline-block align-middle h-7 w-7 transition duration-300 ease-in-out"/>
            <div className="mt-1">{category.name}</div>
          </span>
        ))}
      </div>
    </section>
  )
}
