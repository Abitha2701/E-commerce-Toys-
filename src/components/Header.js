import React, { useState } from "react";
import "./Header.css";
import logo from "../images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // get cart count from Redux
  const cartitems = useSelector((state) => state.cart.cartitems);
  const cartCount = cartitems.reduce((total, item) => total + item.quantity, 0);

  // handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div>
      {/* Top Nav */}
      <nav className="navbar" data-bs-theme="light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" />
          </Link>

          {/* Search */}
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn-search" type="submit">
              Search <i className="fa fa-search" aria-hidden="true"></i>
            </button>

            {/* Profile & Auth */}
            <div className="profile">
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/profile">
                <i className="fas fa-user-circle" aria-hidden="true"></i>
              </Link>
            </div>

            {/* Cart Icon */}
            <div className="cart-icon ms-3">
              <Link to="/cart" className="nav-link position-relative">
                <i className="fa fa-shopping-cart fa-lg"></i>
                {cartCount > 0 && (
                  <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </form>
        </div>
      </nav>

      {/* Second Nav */}
      <div className="nav2">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link active" to="/home">
              Home
            </Link>
          </li>

          {/* Categories */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              Categories
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/softtoys">
                  Soft Toys
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Action Figures
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Building Blocks
                </Link>
              </li>
            </ul>
          </li>

          {/* Brands */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              Brands
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/lego">
                  LEGO
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Mattel
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Hasbro
                </Link>
              </li>
            </ul>
          </li>

          {/* Age Categories */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-expanded="false"
            >
              Age Categories
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="#">
                  0 – 12 Months
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  1 – 2 Years
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  3 – 4 Years
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  5 – 6 Years
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  7 – 8 Years
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  9 – 10 Years
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  11 – 12 Years
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  13 – 15 Years
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  16+ Years
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  All Ages
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        {/* Extra Links */}
        <div className="details">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/wishlist" className="nav-link">
            <i className="fa fa-heart"></i> Wishlist
          </Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
