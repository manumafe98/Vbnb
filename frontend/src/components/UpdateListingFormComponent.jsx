import { DragAndDropImageComponent } from "./DragAndDropImageComponent";
import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { inputWrapperClassNames } from "../constants/inputWrapperClassNames";
import { selectTriggerClassNames } from "../constants/selectTriggerClassNames";
import { useFetch } from "../hooks/useFetch";
import { uploadImagesToCloudinary } from "../hooks/uploadImagesToCloudinary";
import { useState, useEffect } from "react";
import { PopUpNotificationComponent } from "./PopUpNotificationComponent";

export const UpdateListingFormComponent = ({ listingToUpdate }) => {
  const[titlePlaceholder, setTitlePlaceholder] = useState(listingToUpdate.title)
  const[categoryPlaceholder, setCategoryPlaceholder] = useState([`${listingToUpdate.category.id}`])
  const[cityPlaceholder, setCityPlaceholder] = useState([`${listingToUpdate.city.id}`])
  const[descriptionPlaceholder, setDescriptionPlaceholder] = useState(listingToUpdate.description)
  const[newUploadedImages, setNewUploadedImages] = useState([])
  const[cities, setCities] = useState([])
  const[categories, setCategories] = useState([])
  const[characteristics, setCharacteristics] = useState([])
  const[showPopup, setShowPopup] = useState(false)
  const[popupData, setPopupData] = useState({ message: "", action: "", type: "" })

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
    
    await useFetch("/backend/api/v1/city/all", "GET", null, false)
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.log(error))
  }

  const getCategories = async () => {
    
    await useFetch("/backend/api/v1/category/all", "GET", null, false)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log(error))
  }

  const getCharacteristics = async () => {

    await useFetch("/backend/api/v1/characteristic/all", "GET", null, false)
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
    const characteristicIds = characteristicPlaceholder.map(characteristicId => parseInt(characteristicId)).filter(id => !Number.isNaN(id))
    const images = incomingImages.map(image => image.url)
    
    console.log(characteristicIds)

    if (images.length === 0 && newUploadedImages.length === 0) {
      newListingData = { title: titlePlaceholder, description: descriptionPlaceholder, cityId: parseInt(cityPlaceholder), categoryId: parseInt(categoryPlaceholder), images: [], characteristicIds }
    } else if (newUploadedImages.length === 0) {
      newListingData = { title: titlePlaceholder, description: descriptionPlaceholder, cityId: parseInt(cityPlaceholder), categoryId: parseInt(categoryPlaceholder), images, characteristicIds }
    } else {
      const imageUrlsArray = await uploadImagesToCloudinary(newUploadedImages)

      const allImages = images.concat(imageUrlsArray)

      newListingData = { title: titlePlaceholder, description: descriptionPlaceholder, cityId: parseInt(cityPlaceholder), categoryId: parseInt(categoryPlaceholder), images: allImages, characteristicIds }
    }

    const isValid = validateForm(newListingData)

    if (isValid) {
      try {
        const response = await useFetch(`/backend/api/v1/listing/update/${listingToUpdate.id}`, "PUT", newListingData)
        if (response.ok) {
          handlePopUp(`${titlePlaceholder} updated successfully`, "View Listings", "success")
        } else {
          handlePopUp("Listing already exists", "View Listings", "error")
        }

      } catch (error) {
        console.log(error)
      }
    }
  }

  const validateForm = (body) => {
    if (!body.title.trim()) {
      handlePopUp("Please add a valid title", null, "error")
      return false
    }

    if (!body.description.trim()) {
      handlePopUp("Please add a valid description", null, "error")
      return false
    }

    if (!body.cityId) {
      handlePopUp("Please select a city", null, "error")
      return false
    }

    if (!body.categoryId) {
      handlePopUp("Please select a category", null, "error")
      return false
    }

    if (body.images.length === 0) {
      handlePopUp("You must add at least one image", null, "error")
      return false
    }

    if (body.characteristicIds.length === 0) {
      handlePopUp("You must select at least one characteristic", null, "error")
      return false
    }

    return true
  }

  const handlePopUp = (message, action, type) => {
    setShowPopup(true)
    setPopupData({ message, action, type })
    setTimeout(() => setShowPopup(false), 7500)
  }

  return (
    <section className="flex justify-center my-auto min-h-full">
      <div className="flex flex-col items-center justify-center w-1/4 h-2/4 min-h-80 mt-3 border-1 border-solid border-main-gray rounded-xl shadow-md p-3">
        <div>
          <h1 className="text-3xl font-bold text-main-orange mb-4">Update Listing</h1>
        </div>
        <DragAndDropImageComponent onImagesLoaded={handleImagesLoaded} onImages={handleImages} multiple={true} incomingImages={incomingData}/>
        <Input 
          type="text" 
          variant="bordered" 
          label="Title"
          className="w-4/6 mb-2.5"
          classNames={inputWrapperClassNames}
          value={titlePlaceholder}
          onChange={(e) => setTitlePlaceholder(e.target.value)}
        />
        <Textarea
          label="Description"
          variant="bordered"
          placeholder="Enter your description"
          className="w-4/6 mb-2.5"
          classNames={inputWrapperClassNames}
          value={descriptionPlaceholder}
          onChange={(e) => setDescriptionPlaceholder(e.target.value)}
        />
        <Select
          label="Select a category"
          variant="bordered"
          className="w-4/6 mb-2.5"
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
          className="w-4/6 mb-2.5"
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
          className="w-4/6 mb-2.5"
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
        {showPopup && <PopUpNotificationComponent message={popupData.message} action={popupData.action} type={popupData.type}/>}
      </div>
    </section>
  )
}
