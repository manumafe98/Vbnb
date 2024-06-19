import { DragAndDropImageComponent } from "./DragAndDropImageComponent"
import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { inputWrapperClassNames } from '../constants/inputWrapperClassNames'
import { selectTriggerClassNames } from "../constants/selectTriggerClassNames";
import { useFetch } from "../hooks/useFetch";
import { useState, useEffect } from "react";
import { data } from "autoprefixer";

export const AddElementFormComponent = ({ elementName }) => {
  const[element, setElement] = useState('')
  const[country, setCountry] = useState('')
  const[addedSucessfully, setAddedSucessfully] = useState(false)
  const[duplicatedElement, setDuplicatedElement] = useState(false)
  const[cities, setCities] = useState([])
  const[categories, setCategories] = useState([])
  const[characteristics, setCharacteristics] = useState([])
  const[imageUrl, setImageUrl] = useState('')
  const[description, setDescription] = useState('')
  const[cityId, setCityId] = useState(1)
  const[categoryId, setCategoryId] = useState(1)
  const[characteristicIds, setcharacteristicIds] = useState([])
  const[imagesUrls, setImagesUrls] = useState([])
  const[currentImages, setCurrentImages] = useState([])
  
  const url = elementName === "Listing" ? `/backend/api/v1/${elementName.toLowerCase()}/create` : `/backend/api/v1/${elementName.toLowerCase()}`
  let elementData = {}

  switch (elementName) {
    case "City":
      elementData = { name: element, country }
      break
    case "Category":
      elementData = { name: element, imageUrl }
      break
    case "Characteristic":
      elementData = { name: element, imageUrl }
      break
    case "Listing":
      elementData = { title: element, description, cityId, categoryId, images: imagesUrls, characteristicIds }
      break
  }

  const clearMessages = () => {
    setAddedSucessfully(false)
    setDuplicatedElement(false)
  }

  useEffect(() => {
    clearMessages()
    
    if (elementName === "Listing") {
      getCities()
      getCategories()
      getCharacteristics()
    }
  }, [elementName])

  const getCities = async () => {
    
    await useFetch("/backend/api/v1/city", "GET")
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.log(error))
  }

  const getCategories = async () => {
    
    await useFetch("/backend/api/v1/category", "GET")
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log(error))
  }

  const getCharacteristics = async () => {

    await useFetch("/backend/api/v1/characteristic", "GET")
      .then(response => response.json())
      .then(data => setCharacteristics(data))
      .catch(error => console.log(error))
  }

  const handleCharacteristicsSelectChange = (characteristicId) => {
    const newcharacteristicIds = characteristicId.split(",").map(value => parseInt(value))
    setcharacteristicIds(newcharacteristicIds)
  }

  const addElement = async () => {
    uploadImagesToCloudinary()

    await useFetch(url, "POST", elementData)
      .then(response => {
        if (response.ok) {
          setAddedSucessfully(true)
          setDuplicatedElement(false)
        } else {
          setDuplicatedElement(true)
          setAddedSucessfully(false)
        }
      })
      .catch(error => console.log(error))
  }

  const handleImagesLoaded = async (images) => {
    setCurrentImages(images)
  }

  const uploadImagesToCloudinary = async () => {
    const formData = new FormData()

    formData.append("upload_preset", "vbnb-react-upload-unsigned")
    formData.append("api_key", "312794646933875")

    if (currentImages.length > 1 || elementName === "Listing") {
      const cloudinaryImageUrls = []

      const uploadPromises = currentImages.map(async (image) => {
        formData.append("file", image)
        
        const response = await fetch("https://api.cloudinary.com/v1_1/manumafe/image/upload", {
          method: "POST",
          body: formData,
        })
        const data = await response.json()
        cloudinaryImageUrls.push(data.url)
      })
    
      await Promise.all(uploadPromises)
    
      setImagesUrls((prevImagesUrls) => [...prevImagesUrls, ...cloudinaryImageUrls])

    } else {
      formData.append("file", currentImages[0])

      const response = await fetch("https://api.cloudinary.com/v1_1/manumafe/image/upload", {
        method: "POST",
        body: formData
      })

      const data = await response.json()

      setImageUrl(data.url)
    }
  }

  return (
    <section className="form-container">
      <div key={elementName} className="form form-element">
        {elementName !== "City" && (
          <DragAndDropImageComponent onImagesLoaded={handleImagesLoaded} multiple={elementName === "Listing"}/>
        )}
        <Input 
          type="text" 
          variant="bordered" 
          label={elementName == "Listing" ? "Title" : `${elementName}`}
          className="form-input"
          classNames={inputWrapperClassNames}
          onChange={(e) => setElement(e.target.value)}
        />
        {elementName === "City" && (
          <Input
            type="text"
            label="Country"
            variant="bordered"
            className="form-input"
            classNames={inputWrapperClassNames}
            onChange={(e) => setCountry(e.target.value)}
          />
        )}
        {elementName === "Listing" && (
          <>
            <Textarea
              label="Description"
              variant="bordered"
              placeholder="Enter your description"
              className="form-input"
              classNames={inputWrapperClassNames}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Select
              label="Select a category"
              variant="bordered"
              className="form-input"
              onChange={(e) => setCategoryId(e.target.value)}
              classNames={selectTriggerClassNames}
            >
              {categories.map((category) => (
                <SelectItem key={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Select a city"
              variant="bordered"
              className="form-input"
              onChange={(e) => setCityId(e.target.value)}
              classNames={selectTriggerClassNames}
            >
              {cities.map((city) => (
                <SelectItem key={city.id}>
                  {city.name}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Select characteristics"
              variant="bordered"
              selectionMode="multiple"
              className="form-input"
              onChange={(e) => handleCharacteristicsSelectChange(e.target.value)}
              classNames={selectTriggerClassNames}
            >
              {characteristics.map((characteristic) => (
                <SelectItem key={characteristic.id}>
                  {characteristic.name}
                </SelectItem>
              ))}                           
            </Select>            
          </>
        )}
        <Button radius="full" className="bg-[#ff6f00] text-white" onClick={addElement}>
            Add { elementName }
        </Button>
        {addedSucessfully && <p className="sucessfull-message">{elementName}: {element} added sucessfully</p>}
        {duplicatedElement && <p className="error-message">{elementName} already exists</p>}
      </div>
    </section>
  )
}
