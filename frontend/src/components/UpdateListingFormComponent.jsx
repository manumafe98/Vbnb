import { DragAndDropImageComponent } from "./DragAndDropImageComponent";
import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { inputWrapperClassNames } from '../constants/inputWrapperClassNames';
import { selectTriggerClassNames } from "../constants/selectTriggerClassNames";
import { useFetch } from "../hooks/useFetch";
import { uploadImagesToCloudinary } from "../hooks/uploadImagesToCloudinary";
import { useState, useEffect } from "react";

export const UpdateListingFormComponent = ({ listingToUpdate }) => {
  const[titlePlaceholder, setTitlePlaceholder] = useState(listingToUpdate.title)
  const[categoryPlaceholder, setCategoryPlaceholder] = useState([`${listingToUpdate.category.id}`])
  const[cityPlaceholder, setCityPlaceholder] = useState([`${listingToUpdate.city.id}`])
  const[descriptionPlaceholder, setDescriptionPlaceholder] = useState(listingToUpdate.description)
  const[newUploadedImages, setNewUploadedImages] = useState([])
  const[updatedSucessfully, setUpdatedSucessfully] = useState(false)
  const[cities, setCities] = useState([])
  const[categories, setCategories] = useState([])
  const[characteristics, setCharacteristics] = useState([])

  const characteristicsArray = listingToUpdate.characteristics.map(characteristicData => (
    `${characteristicData.id}`
  ))

  const[characteristicPlaceholder, setCharacteristicPlaceholder] = useState(characteristicsArray)

  const incomingData = listingToUpdate.images.map(imageData => ({
    name: imageData.id,
    url: imageData.imageUrl
  }))

  const[incomingImages, setIncomingImages] = useState(incomingData)

  let newListingData = {}

  useEffect(() => {
    getCities()
    getCategories()
    getCharacteristics()
  }, [])

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

  const handleImagesLoaded = async (images) => {
    setNewUploadedImages(images)
  }

  const handleImages = async (images) => {
    setIncomingImages(images)
  }

  const handleCharacteristics = (event) => {
    setCharacteristicPlaceholder(event.target.value.split(","))
  }

  const updateListing = async () => {
    const characteristicIds = characteristicPlaceholder.map(characteristicId => parseInt(characteristicId))
    const images = incomingImages.map(image => image.url)
    
    if (newUploadedImages.length == 0) {
      newListingData = { title: titlePlaceholder, description: descriptionPlaceholder, cityId: parseInt(cityPlaceholder), categoryId: parseInt(categoryPlaceholder), images, characteristicIds }
    } else {
      const imageUrlsArray = await uploadImagesToCloudinary(newUploadedImages)

      const allImages = images.concat(imageUrlsArray)

      newListingData = { title: titlePlaceholder, description: descriptionPlaceholder, cityId: parseInt(cityPlaceholder), categoryId: parseInt(categoryPlaceholder), images: allImages, characteristicIds }
    }

    try {
      await useFetch(`/backend/api/v1/listing/update/${listingToUpdate.id}`, "PUT", newListingData)
      setUpdatedSucessfully(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="form-container">
      <div className="form form-element">
        <DragAndDropImageComponent onImagesLoaded={handleImagesLoaded} onImages={handleImages} multiple={true} incomingImages={incomingData}/>
        <Input 
          type="text" 
          variant="bordered" 
          label="Title"
          className="form-input"
          classNames={inputWrapperClassNames}
          value={titlePlaceholder}
          onChange={(e) => setTitlePlaceholder(e.target.value)}
        />
        <Textarea
          label="Description"
          variant="bordered"
          placeholder="Enter your description"
          className="form-input"
          classNames={inputWrapperClassNames}
          value={descriptionPlaceholder}
          onChange={(e) => setDescriptionPlaceholder(e.target.value)}
        />
        <Select
          label="Select a category"
          variant="bordered"
          className="select-input"
          selectedKeys={categoryPlaceholder}
          onChange={(e) => setCategoryPlaceholder([e.target.value])}
          classNames={selectTriggerClassNames}
        >
          {categories.map((category) => (
            <SelectItem key={category.id} startContent={<img className="w-6 h-6" src={category.imageUrl}/>}>
              {category.name}
            </SelectItem>
          ))}
        </Select>
        <Select
          label="Select a city"
          variant="bordered"
          className="select-input"
          selectedKeys={cityPlaceholder}
          onChange={(e) => setCityPlaceholder([e.target.value])}
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
          className="select-input"
          selectedKeys={characteristicPlaceholder}
          onChange={handleCharacteristics}
          classNames={selectTriggerClassNames}
        >
          {characteristics.map((characteristic) => (
            <SelectItem key={characteristic.id} startContent={<img className="w-6 h-6" src={characteristic.imageUrl}/>}>
              {characteristic.name}
            </SelectItem>
          ))}
        </Select>
        <Button radius="full" className="bg-[#ff6f00] text-white" onClick={updateListing}>
          Update Listing
        </Button>
        {updatedSucessfully && <p className="sucessfull-message">Listing updated sucessfully</p>}
      </div>
    </section>
  )
}
