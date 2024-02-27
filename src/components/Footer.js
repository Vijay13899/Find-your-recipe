import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="p-3 bg-success">
      <div className="d-flex justify-content-evenly flex-wrap">
        <ul>
          <li>
            <Link to="/" className="link">
              HOME
            </Link>
          </li>
          <li>
            <Link to="/search" className="link">
              SEARCH
            </Link>
          </li>
          <li>
            <Link to="/saved" className="link">
              SAVED
            </Link>
          </li>
          <li>
            <Link to="/browse" className="link">
              BROWSE
            </Link>
          </li>
        </ul>
        <ul>
          <li className="link">
            <FaFacebook />
          </li>
          <li className="link">
            <FaInstagram />
          </li>
          <li className="link">
            <FaTwitter />
          </li>
        </ul>
      </div>
      <p className="text-center">Copyright &copy; 2023</p>
      <p className="text-center">Designed and created by me (Vijay)</p>
    </footer>
  );
}
