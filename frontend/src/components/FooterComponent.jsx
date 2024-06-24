import { InstagramIcon, TwitterIcon, FacebookIcon } from "../constants/Icons";

export const FooterComponent = () => {

  return (
    <footer className="main-footer">
        <div className="footer-container">
          <p>© {new Date().getFullYear()} Vbnb</p>
          <ul className="flex gap-4">
            <li><TwitterIcon className="fill-current text-gray-500 group-hover:text-orange-500"/></li>
            <li><InstagramIcon className="fill-current text-gray-500 group-hover:text-orange-500"/></li>
            <li><FacebookIcon className="fill-current text-gray-500 group-hover:text-orange-500"/></li>
          </ul>
        </div>
    </footer>
  )
}
