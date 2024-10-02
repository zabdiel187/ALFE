import { Link } from "react-router-dom";
import { useStore } from "../stores/MenuStore";

import "./navbar.css";

const Navbar = () => {
  const quantity = useStore((state) => state.cartQuantity);

  const currentPath = window.location.pathname;

  return (
    <nav className="navBar">
      <ul className="leftNavContainer">
        <img
          className="logo"
          alt="logo"
          src="https://lh3.googleusercontent.com/pw/AP1GczNXsEtBSYvHSjvD43mLpdmxBGmorp-ctJU0bygiqrH6YvSZfdqWFoYAc5ZepbFNF9TQpP2Ie5E9gD1gvol5UjwEsCSySJQZC238Hb5Syn4ex-9KWb0=w2400"
          //src="https://lh3.googleusercontent.com/pw/AP1GczM_uSeM6IzUfezcpT0BHJIsvH6PKZRjE_aZ-az4iMcwq6mcWFUt0pZcAoqAw2Q37jQnK-0Qa_bJxW1xLTIM4XrVHwrYV2M4YLon4vXFLHiq2GXmb18=w2400"
        />
        <Link className="navLinks" to="/">
          <li>Home</li>
          <div
            className={
              currentPath === "/" || currentPath === "/home"
                ? "underline"
                : "none"
            }
          ></div>
        </Link>
        <Link className="navLinks" to="/menu">
          <li>Menu</li>
          <div className={currentPath === "/menu" ? "underline" : "none"}></div>
        </Link>
      </ul>
      <div className="rightNavContainer">
        <Link to="/cart">
          <i className="fa fa-shopping-cart" />
          <span className="quantity">{quantity}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
