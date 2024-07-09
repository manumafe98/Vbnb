import { Link } from "react-router-dom";
import { XMarkIcon } from "../constants/Icons";

export const MobileMenuComponent = ({ isOpen, onClose }) => {
  return (
    <div className={`fixed top-0 right-0 w-1/2 h-screen bg-[#F9F9F9] transform ${isOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-40`}>
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start p-4 bg-main-orange min-h-44">
          <button onClick={onClose} className="text-white">
            <XMarkIcon className="w-6 h-6"/>
          </button>
          <span className="text-white text-xl font-bold">MENU</span>
        </div>
        <div className="flex-grow p-4">
          <Link to="/auth/signup">
            <button className="w-full text-center text-md text-main-orange font-bold p-2 border-b border-main-orange">Sign up</button>
          </Link>
          <Link to="/auth/signin">
            <button className="w-full text-center text-md text-main-orange font-bold p-2 border-b border-main-orange">Sign in</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
