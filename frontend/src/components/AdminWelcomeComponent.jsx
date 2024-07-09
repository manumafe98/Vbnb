export const AdminWelcomeComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center my-auto min-h-full">
      <h1 className="text-4xl text-main-orange font-bold mb-4">Welcome to Admin Dashboard</h1>
      <p className="text-xl text-gray-600 mb-8">Use the navigation bar to access various admin functions.</p>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl text-main-orange font-semibold mb-4">Quick Overview</h2>
        <ul className="list-disc list-inside">
          <li className="text-gray-700 mb-2">Administrate users and permissions</li>
          <li className="text-gray-700 mb-2">Administrate, add and update listings</li>
          <li className="text-gray-700 mb-2">Administrate, add and update cities</li>
          <li className="text-gray-700 mb-2">Administrate, add and update characteristics</li>
          <li className="text-gray-700 mb-2">Administrate and add categories</li>
        </ul>
      </div>
    </div>
  )
}
