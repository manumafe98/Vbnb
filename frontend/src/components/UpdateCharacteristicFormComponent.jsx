import { Input, Button } from "@nextui-org/react";
import { DragAndDropImageComponent } from "./DragAndDropImageComponent";
import { inputWrapperClassNames } from '../constants/inputWrapperClassNames'
import { useFetch } from "../hooks/useFetch";
import { uploadImagesToCloudinary } from "../hooks/uploadImagesToCloudinary";
import { useState } from "react";


export const UpdateCharacteristicFormComponent = ({ characteristicToUpdate }) => {
  const[categoryNameplaceholder, setCategoryNamePlaceholder] = useState(characteristicToUpdate.name);
  const[newUploadedImages, setNewUploadedImages] = useState([])
  const[updatedSucessfully, setUpdatedSucessfully] = useState(false)

  const incomingData = [{name: characteristicToUpdate.name, url: characteristicToUpdate.imageUrl}]

  let newCharacteristicData = {}

  const handleImagesLoaded = async (images) => {
    setNewUploadedImages(images)
  }

  const handleImages = async (images) => {
    console.log(images)
  }

  const updateCharacteristic = async () => {
    if (newUploadedImages.length === 0) {
      newCharacteristicData = {name: categoryNameplaceholder, imageUrl: characteristicToUpdate.imageUrl}
    } else {
      const imageUrlsArray = await uploadImagesToCloudinary(newUploadedImages)
      newCharacteristicData = {name: categoryNameplaceholder, imageUrl: imageUrlsArray[0]}
    }
  
    try {
      await useFetch(`/backend/api/v1/characteristic/${characteristicToUpdate.id}`, "PUT", newCharacteristicData)
      setUpdatedSucessfully(true)
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <section className="form-container">
      <div className="form form-element">
        <DragAndDropImageComponent onImagesLoaded={handleImagesLoaded} onImages={handleImages} multiple={false} incomingImages={incomingData}/>
        <Input 
          type="text" 
          variant="bordered" 
          label="Characteristic"
          className="form-input"
          classNames={inputWrapperClassNames}
          value={categoryNameplaceholder}
          onChange={(e) => setCategoryNamePlaceholder(e.target.value)}
        />
        <Button radius="full" className="bg-[#ff6f00] text-white" onClick={updateCharacteristic}>
          Update Characteristic
        </Button>
        {updatedSucessfully && <p className="sucessfull-message">Category updated sucessfully</p>}
      </div>
    </section>
  )
}
