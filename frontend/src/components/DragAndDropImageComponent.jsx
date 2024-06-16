import { useState, useRef } from 'react';
import '../styles/DragAndDropImageComponent.css';
import { DownloadCloud } from '../constants/Icons'

export const DragAndDropImageComponent = ({ multiple = false }) => {
  const [images, setImages] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

  const selectFiles = () => {
    fileInputRef.current.click()
  }

  const handleFiles = (files) => {
    const newImages = []
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue
      if (!images.some((e) => e.name === files[i].name)) {
        newImages.push({
          name: files[i].name,
          url: URL.createObjectURL(files[i]),
        })
      }

      if (!multiple && newImages.length > 0) break
    }
    if (newImages.length > 0) {
      if (multiple) {
        setImages((prevImages) => [...prevImages, ...newImages])
      } else {
        setImages(newImages)
      }
    }
  }

  const onFileSelect = (event) => {
    const files = event.target.files
    if (files.length === 0) return
    handleFiles(files)
  }

  const deleteImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const onDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
    event.dataTransfer.dropEffect = 'copy'
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
        className={`drag-area ${isDragging ? 'dragging' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {isDragging ? (
          // <span className="select">Drop your image here</span>
          <DownloadCloud/>
        ) : (
          <>
            Drag & Drop an image here or{' '}
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
