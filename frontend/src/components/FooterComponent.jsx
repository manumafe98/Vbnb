import { InstagramIcon, TwitterIcon, FacebookIcon } from "../constants/Icons";

export const FooterComponent = () => {
  return (
    <footer className="flex justify-center w-full h-16 mt-auto">
        <div className="flex w-4/5 justify-between content-center border-t-1 border-solid border-main-gray pt-2.5">
          <p>© {new Date().getFullYear()} Vbnb</p>
          <ul className="flex gap-4">
            <li className="group"><TwitterIcon className="fill-current text-gray-500 group-hover:text-main-orange"/></li>
            <li className="group"><InstagramIcon className="fill-current text-gray-500 group-hover:text-main-orange"/></li>
            <li className="group"><FacebookIcon className="fill-current text-gray-500 group-hover:text-main-orange"/></li>
          </ul>
        </div>
    </footer>
  )
}
