import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {jwtDecode } from "jwt-decode";
import logo from "../../Assets/images/freshcart-logo.svg";
import { wishlistContext } from "./../../Context/WishlistContext";
import { cartContext } from "../../Context/CartContext";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const { numCartItems } = useContext(cartContext);
  const { wishlist } = useContext(wishlistContext);
  const location = useLocation();
  const [username, setUsername] = useState(null);

  const isActive = (path) => location.pathname === path;

  function handleLogOut() {
    localStorage.clear("userToken");
    return window.location.reload();
  }

  // Decode token to get the username
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.name || decodedToken.username || "User");
    }
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Fresh Cart" className={styles.logo} />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/") ? styles.activeLink : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/products") ? styles.activeLink : ""}`}
                to="/products"
              >
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/categories") ? styles.activeLink : ""}`}
                to="/categories"
              >
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/brands") ? styles.activeLink : ""}`}
                to="/brands"
              >
                Brands
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/wishlist") ? styles.activeLink : ""}`}
                to="/wishlist"
              >
                <div className="position-relative">
                  <i className="fa-regular fa-heart fs-4"></i>
                  {wishlist?.length > 0 && (
                    <span
                      className={`badge position-absolute top-0 start-100 translate-middle ${styles.badge}`}
                    >
                      {wishlist.length}
                    </span>
                  )}
                </div>
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${isActive("/cart") ? styles.activeLink : ""}`}
                to="/cart"
              >
                <div className="position-relative">
                  <i className="fa-solid fa-cart-shopping fs-4"></i>
                  {numCartItems > 0 && (
                    <span
                      className={`badge position-absolute top-0 start-100 translate-middle ${styles.badge}`}
                    >
                      {numCartItems}
                    </span>
                  )}
                </div>
              </Link>
            </li>

            {localStorage.getItem("userToken") ? (
              // Add the dropdown for "Hi, Username"
              <li className="ms-2 nav-item dropdown">
                <span
                  className={`nav-link dropdown-toggle ${styles.navUser}`}
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Hi, {username}
                </span>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/profilePage">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleLogOut}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/login") ? styles.activeLink : ""}`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${isActive("/register") ? styles.activeLink : ""}`}
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
