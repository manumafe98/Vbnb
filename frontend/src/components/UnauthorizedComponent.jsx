export const UnauthorizedComponent = () => {
  return (
    <div className="flex items-center justify-center my-auto min-h-full">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800 mb-6">401</h1>
        <p className="text-2xl text-gray-600 mb-2">Unauthorized</p>
        <p className="text-gray-500">We are sorry, but you are not authorized to access this page</p>
      </div>
    </div>
  )
}
