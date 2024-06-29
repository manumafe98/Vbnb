import { DragAndDropImageComponent } from "./DragAndDropImageComponent";
import { Input, Button, Textarea, Select, SelectItem } from "@nextui-org/react";
import { inputWrapperClassNames } from "../constants/inputWrapperClassNames";
import { selectTriggerClassNames } from "../constants/selectTriggerClassNames";
import { useFetch } from "../hooks/useFetch";
import { uploadImagesToCloudinary } from "../hooks/uploadImagesToCloudinary";
import { useState, useEffect } from "react";
import { PopUpNotificationComponent } from "./PopUpNotificationComponent";

export const AddElementFormComponent = ({ elementName }) => {
  const[element, setElement] = useState('')
  const[country, setCountry] = useState('')
  const[cities, setCities] = useState([])
  const[categories, setCategories] = useState([])
  const[characteristics, setCharacteristics] = useState([])
  const[description, setDescription] = useState('')
  const[cityId, setCityId] = useState(1)
  const[categoryId, setCategoryId] = useState(1)
  const[characteristicIds, setcharacteristicIds] = useState([])
  const[currentImages, setCurrentImages] = useState([])
  const[showPopup, setShowPopup] = useState(false)
  const[popupData, setPopupData] = useState({ message: "", action: "", type: "" })

  const url = elementName === "Listing" ? `/backend/api/v1/${elementName.toLowerCase()}/create` : `/backend/api/v1/${elementName.toLowerCase()}`

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
        elementData = { title: element, description, cityId, categoryId, images: imagesUrls, characteristicIds }
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

  const handleCharacteristicsSelectChange = (characteristicId) => {
    const newcharacteristicIds = characteristicId.split(",").map(value => parseInt(value))
    setcharacteristicIds(newcharacteristicIds)
  }

  const addElement = async () => {
    let body = {}

    if (elementName !== "City") {

      const imageUrlsArray = await uploadImagesToCloudinary(currentImages)

      body = imageUrlsArray.length >= 1 && elementName === "Listing"  ? setElementData(null, imageUrlsArray) : setElementData(imageUrlsArray[0])

    } else {

      body = setElementData()
    }

    await useFetch(url, "POST", body)
      .then(response => {
        const action = elementName === "City" || elementName === "Category" ? `${elementName.substring(0, elementName.length - 1)}ies` : `${elementName}s`

        if (response.ok) {
          setShowPopup(true)
          setPopupData({ message: `${elementName} added successfully`, action: `View ${action}` , type: "success" })
          setTimeout(() => setShowPopup(false), 7500)
        } else {
          setShowPopup(true)
          setPopupData({ message: `${elementName} already exists`, action: `View ${action}` , type: "error" })
          setTimeout(() => setShowPopup(false), 7500)
        }
      })
      .catch(error => console.log(error))
  }

  const handleImagesLoaded = async (images) => {
    setCurrentImages(images)
  }

  const handleImages = async (images) => {
    console.log(images)
  }

  return (
    <section className="flex justify-center content content-center my-auto min-h-full">
      <div key={elementName} className="flex flex-col items-center justify-center w-1/4 h-2/4 min-h-80 mt-3 border-1 border-solid border-main-gray rounded-xl shadow-md p-3">
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
          </>
        )}
        <Button radius="full" className="bg-main-orange text-white" onClick={addElement}>
            Add { elementName }
        </Button>
        {showPopup && <PopUpNotificationComponent message={popupData.message} action={popupData.action} type={popupData.type}/>}
      </div>
    </section>
  )
}
