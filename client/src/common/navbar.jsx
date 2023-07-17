import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);

  const closeMobileMenu = () => setClick(false);

  const toggleMenu = () => {
    setClick(!click);
  };

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
    document.querySelector("html").scrollTop = window.scrollY;
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (click) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [click]);

  return (
    <div>
      <nav className="navbar">
        <div>
          <div className="menu-icon" onClick={toggleMenu}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link className="nav-links" to="/menu" onClick={closeMobileMenu}>
              Menu
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="/cart" onClick={closeMobileMenu}>
              Cart
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="/login" onClick={closeMobileMenu}>
              Log in
            </Link>
          </li>
        </ul>

        <Link to="/cart">
          <i className="fa fa-shopping-cart" />
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
