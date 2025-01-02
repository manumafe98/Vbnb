import { useEffect, useRef, useState } from "react";
import { DownloadCloudIcon } from "../constants/Icons";
import "../styles/DragAndDropImageComponent.css";

export const DragAndDropImageComponent = ({ onImagesLoaded, onImages, multiple = false, incomingImages = [] }) => {
  const[images, setImages] = useState(incomingImages)
  const[fileObjects, setFileObjects] = useState([])
  const[updateIncomingImages, setUpdateIncomingImages] = useState(incomingImages)
  const[isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    onImagesLoaded(fileObjects)
    onImages(updateIncomingImages)
  }, [fileObjects, images])

  const selectFiles = () => {
    fileInputRef.current.click()
  }

  const handleFiles = (files) => {

    const newImages = []
    const newFileObjects = []

    for (let i = 0; i < files.length; i++) {

      if (!images.some((e) => e.name === files[i].name)) {
        newImages.push({
          name: files[i].name,
          url: URL.createObjectURL(files[i])
        })

        newFileObjects.push(files[i])
      }

      if (!multiple && newImages.length > 0) break
    }

    if (newImages.length > 0) {
      const updatedImages = multiple ? [...images, ...newImages] : newImages
      const updatedFileObjects = multiple ? [...fileObjects, ...newFileObjects] : newFileObjects

      setImages(updatedImages)
      setFileObjects(updatedFileObjects)
    }
  }

  const onFileSelect = (event) => {
    const files = event.target.files
    if (files.length === 0) return
    handleFiles(files)
  }

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
    setFileObjects((prevFiles) => prevFiles.filter((_, i) => i !== index))
    updateIncomingImages.length === 0 ? null : setUpdateIncomingImages((prevFiles) => prevFiles.filter((_, i) => i !== index))
  }

  const onDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
    event.dataTransfer.dropEffect = "copy"
  }

  const onDragLeave = (event) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    const files = event.dataTransfer.files
    if (files.length === 0) return
    handleFiles(files)
  }

  return (
    <div className="card">
      <div
        className={`drag-area ${isDragging ? "dragging" : ""}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {isDragging ? (
          <DownloadCloudIcon/>
        ) : (
          <>
            Drag & Drop or {" "}
            <span className="select" role="button" onClick={selectFiles}>
              Browse
            </span>
          </>
        )}
        <input type="file" name="file" multiple={multiple} ref={fileInputRef} onChange={onFileSelect} accept="image/*"/>
      </div>
      <div className="container">
        {images.map((image, index) => (
          <div className="image" key={index}>
            <span className="delete" onClick={() => deleteImage(index)}>
              &times;
            </span>
            <img src={image.url} alt={image.name} />
          </div>
        ))}
      </div>
    </div>
  )
}
