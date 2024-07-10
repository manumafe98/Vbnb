export const UnavailableComponent = () => {
  return (
    <div className="flex items-center justify-center my-auto min-h-full">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800 mb-6">503</h1>
        <p className="text-2xl text-gray-600 mb-2">Service Unavailable</p>
        <p className="text-gray-500">Admin access is not available on mobile devices or small screens.</p>
        <p className="text-gray-500 mt-2">Please use a desktop computer or larger screen to access the admin panel.</p>
      </div>
    </div>
  )
}
