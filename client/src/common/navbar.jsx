import { Link } from "react-router-dom";
import { useStore } from "../stores/MenuStore";

import "./navbar.css";

const Navbar = () => {
  const quantity = useStore((state) => state.cartQuantity);
  return (
    <nav className="navBar">
      <ul className="leftNavContainer">
        <Link className="navLinks" to="/">
          <li>Home</li>
        </Link>
        <Link className="navLinks" to="/menu">
          <li>Menu</li>
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
