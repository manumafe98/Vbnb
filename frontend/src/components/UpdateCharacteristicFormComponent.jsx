import { Input, Button } from "@nextui-org/react";
import { DragAndDropImageComponent } from "./DragAndDropImageComponent";
import { inputWrapperClassNames } from "../constants/inputWrapperClassNames";
import { useFetch } from "../hooks/useFetch";
import { uploadImagesToCloudinary } from "../hooks/uploadImagesToCloudinary";
import { useState } from "react";
import { PopUpNotificationComponent } from "./PopUpNotificationComponent";

export const UpdateCharacteristicFormComponent = ({ characteristicToUpdate }) => {
  const[characteristicNameplaceholder, setcharacteristicNameplaceholder] = useState(characteristicToUpdate.name);
  const[newUploadedImages, setNewUploadedImages] = useState([])
  const[showPopup, setShowPopup] = useState(false)
  const[popupData, setPopupData] = useState({ message: "", action: "", type: "" })

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
      newCharacteristicData = {name: characteristicNameplaceholder, imageUrl: characteristicToUpdate.imageUrl}
    } else {
      const imageUrlsArray = await uploadImagesToCloudinary(newUploadedImages)
      newCharacteristicData = {name: characteristicNameplaceholder, imageUrl: imageUrlsArray[0]}
    }

    try {
      await useFetch(`/backend/api/v1/characteristic/${characteristicToUpdate.id}`, "PUT", newCharacteristicData)
      handlePopUp(`${characteristicNameplaceholder} updated successfully`, "View Characteristics", "success")
    } catch (error) {
      console.log(error)
    }
  }

  const handlePopUp = (message, action, type) => {
    setShowPopup(true)
    setPopupData({ message, action, type })
    setTimeout(() => setShowPopup(false), 7500)
  }

  return (
    <section className="flex justify-center my-auto min-h-full">
      <div className="flex flex-col items-center justify-center w-1/4 h-2/4 min-h-80 mt-3 border-1 border-solid border-main-gray rounded-xl shadow-md p-3">
        <DragAndDropImageComponent onImagesLoaded={handleImagesLoaded} onImages={handleImages} multiple={false} incomingImages={incomingData}/>
        <Input 
          type="text" 
          variant="bordered" 
          label="Characteristic"
          className="w-4/6 mb-2.5"
          classNames={inputWrapperClassNames}
          value={characteristicNameplaceholder}
          onChange={(e) => setcharacteristicNameplaceholder(e.target.value)}
        />
        <Button radius="full" className="bg-[#ff6f00] text-white" onClick={updateCharacteristic}>
          Update Characteristic
        </Button>
        {showPopup && <PopUpNotificationComponent message={popupData.message} action={popupData.action} type={popupData.type}/>}
      </div>
    </section>
  )
}
