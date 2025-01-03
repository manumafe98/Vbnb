import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { inputWrapperClassNames } from "../constants/inputWrapperClassNames";
import { selectTriggerClassNames } from "../constants/selectTriggerClassNames";
import { uploadImagesToCloudinary } from "../hooks/uploadImagesToCloudinary";
import { useFetch } from "../hooks/useFetch";
import "../styles/phone-input.css";
import { DragAndDropImageComponent } from "./DragAndDropImageComponent";
import { PopUpNotificationComponent } from "./PopUpNotificationComponent";

export const AddElementFormComponent = ({ elementName }) => {
  const[element, setElement] = useState('')
  const[country, setCountry] = useState('')
  const[cities, setCities] = useState([])
  const[categories, setCategories] = useState([])
  const[characteristics, setCharacteristics] = useState([])
  const[description, setDescription] = useState('')
  const[ownerPhoneNumber, setOwnerPhoneNumber] = useState('')
  const[cityId, setCityId] = useState(null)
  const[categoryId, setCategoryId] = useState(null)
  const[characteristicIds, setcharacteristicIds] = useState([])
  const[currentImages, setCurrentImages] = useState([])
  const[showPopup, setShowPopup] = useState(false)
  const[popupData, setPopupData] = useState({ message: "", action: "", type: "" })

  const url = elementName === "Listing" ? `${import.meta.env.BACKEND_URL}/api/v1/${elementName.toLowerCase()}/create` : `${import.meta.env.BACKEND_URL}/api/v1/${elementName.toLowerCase()}`

  const setElementData = (imageUrl = null, imagesUrls = null) => {
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
        elementData = { title: element, description, ownerPhoneNumber, cityId, categoryId, images: imagesUrls, characteristicIds }
        break
    }

    return elementData
  }

  useEffect(() => {
    if (elementName === "Listing") {
      getCities()
      getCategories()
      getCharacteristics()
    }
  }, [elementName])

  const getCities = async () => {

    await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/city/all`, "GET", null, false)
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.log(error))
  }

  const getCategories = async () => {

    await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/category/all`, "GET", null, false)
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.log(error))
  }

  const getCharacteristics = async () => {

    await useFetch(`${import.meta.env.BACKEND_URL}/api/v1/characteristic/all`, "GET", null, false)
      .then(response => response.json())
      .then(data => setCharacteristics(data))
      .catch(error => console.log(error))
  }

  const handleCharacteristicsSelectChange = (characteristicId) => {
    const newcharacteristicIds = characteristicId.split(",").map(value => parseInt(value)).filter(id => !Number.isNaN(id))
    setcharacteristicIds(newcharacteristicIds)
  }

  const validateForm = (body) => {

    if (elementName !== "Listing") {
      if (!body.name.trim()) {
        handlePopUp(`Please add a valid ${elementName} name`, null, "error")
        return false
      }

      if (elementName !== "City" && !body.imageUrl) {
        handlePopUp("You Must add an image", null, "error")
        return false
      }
    }

    if (elementName === "City" && !body.country.trim()) {
      handlePopUp("Please add a valid country", null, "error")
      return false
    }

    if (elementName === "Listing") {

      if (!body.title.trim()) {
        handlePopUp("Please add a valid title", null, "error")
        return false
      }

      if (!body.description.trim()) {
        handlePopUp("Please add a valid description", null, "error")
        return false
      }

      if (!body.ownerPhoneNumber) {
        handlePopUp("Please add a valid phone number", null, "error")
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

      if (!body.images) {
        handlePopUp("You must add at least one image", null, "error")
        return false
      }

      if (body.characteristicIds.length === 0) {
        handlePopUp("You must select at least one characteristic", null, "error")
        return false
      }
    }

    return true
  }

  const addElement = async () => {
    let body = {}

    if (elementName !== "City") {

      const imageUrlsArray = await uploadImagesToCloudinary(currentImages)

      body = imageUrlsArray.length >= 1 && elementName === "Listing"  ? setElementData(null, imageUrlsArray) : setElementData(imageUrlsArray[0])

    } else {

      body = setElementData()
    }

    const isValid = validateForm(body)

    if (isValid) {
      const action = elementName === "City" || elementName === "Category" ? `${elementName.substring(0, elementName.length - 1)}ies` : `${elementName}s`

      try {
        const response = await useFetch(url, "POST", body)  
        response.ok ? handlePopUp(`${element} added successfully`, `View ${action}`, "success") : handlePopUp( `${element} already exists`, `View ${action}`, "error")
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handlePopUp = (message, action, type) => {
    setShowPopup(true)
    setPopupData({ message, action, type })
    setTimeout(() => setShowPopup(false), 7500)
  }

  const handleImagesLoaded = async (images) => {
    setCurrentImages(images)
  }

  const handleImages = async (images) => {
    console.log(images)
  }

  return (
    <section className="flex justify-center content content-center my-auto min-h-full">
      <div key={elementName} className="flex flex-col items-center justify-center w-1/4 h-2/4 min-h-80 my-5 border-1 border-solid border-main-gray rounded-xl shadow-md p-4">
        <div>
          <h1 className="text-3xl font-bold text-main-orange mb-4">Add {elementName}</h1>
        </div>
        {elementName !== "City" && (
          <DragAndDropImageComponent onImagesLoaded={handleImagesLoaded} onImages={handleImages} multiple={elementName === "Listing"}/>
        )}
        <Input
          type="text"
          variant="bordered"
          label={elementName == "Listing" ? "Title" : `${elementName}`}
          className="w-4/6 mb-2.5"
          classNames={inputWrapperClassNames}
          onChange={(e) => {setElement(e.target.value)}}
        />
        {elementName === "City" && (
          <Input
            type="text"
            label="Country"
            variant="bordered"
            className="w-4/6 mb-2.5"
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
              className="w-4/6 mb-2.5"
              classNames={inputWrapperClassNames}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Select
              label="Select a category"
              variant="bordered"
              className="w-4/6 mb-2.5"
              onChange={(e) => setCategoryId(e.target.value)}
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
              className="w-4/6 mb-2.5"
              onChange={(e) => handleCharacteristicsSelectChange(e.target.value)}
              classNames={selectTriggerClassNames}
            >
              {characteristics.map((characteristic) => (
                <SelectItem key={characteristic.id} startContent={<img className="w-6 h-6" src={characteristic.imageUrl}/>}>
                  {characteristic.name}
                </SelectItem>
              ))}
            </Select>
            <PhoneInput
              placeholder="Enter phone number"
              value={ownerPhoneNumber}
              onChange={setOwnerPhoneNumber}
              className="my-custom-phone-input"
            />
          </>
        )}
        <Button radius="full" className="bg-main-orange w-4/6 text-white" onClick={addElement}>
            Add { elementName }
        </Button>
        {showPopup && <PopUpNotificationComponent message={popupData.message} action={popupData.action} type={popupData.type}/>}
      </div>
    </section>
  )
}
