export const uploadImagesToCloudinary = async (images) => {
    const cloudinaryImageUrls = []

    const formData = new FormData()
    formData.append("upload_preset", "vbnb-react-upload-unsigned")
    formData.append("api_key", "312794646933875")

    const uploadPromises = images.map(async (image) => {
      formData.append("file", image)

      const response = await fetch("https://api.cloudinary.com/v1_1/manumafe/image/upload", {
        method: "POST",
        body: formData,
      })
      const data = await response.json()
      cloudinaryImageUrls.push(data.url)
    })

    await Promise.all(uploadPromises)

    return cloudinaryImageUrls
}
