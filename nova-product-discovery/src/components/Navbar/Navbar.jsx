import {
  FaHeart,
  FaShoppingBag,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import { useShop } from "../../context/ShopContext";

import "./Navbar.css";

function Navbar() {
  const { cartCount, favorites } = useShop();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link
          to="/"
          className="navbar-logo"
        >
          NOVA<span>.</span>
        </Link>

        {/* Navigation */}
        <div className="navbar-links">
          <Link to="/">
            Home
          </Link>

          <Link to="/#products">
            Products
          </Link>

          <Link to="/categories">
            Categories
          </Link>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          {/* Favorites */}
          <Link
            to="/favorites"
            className="navbar-icon-btn"
            aria-label="Favorites"
          >
            <FaHeart />

            {favorites.length > 0 && (
              <span className="navbar-badge">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="navbar-icon-btn"
            aria-label="Shopping bag"
          >
            <FaShoppingBag />

            {cartCount > 0 && (
              <span className="navbar-badge">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
