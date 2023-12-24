import { Link } from "react-router-dom";
import { useStore } from "../stores/MenuStore";

import "./navbar.css";

const Navbar = () => {
  const quantity = useStore((state) => state.cartQuantity);
  return (
    <div>
      <nav className="navbar">
        <Link className="nav-links" to="/menu">
          <h1 className="name"><span className="AL">AL</span><span className="FE">FE</span> Catering</h1>
        </Link>

        <Link className="nav-links" to="/cart">
          <i className="fa fa-shopping-cart" />
          <span className="quantity">{quantity}</span>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
