import React from 'react';
import './Header.css';
import logo from '../images/logo1.png';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Header = () => {
  return (
    <div>
      <nav className="navbar" data-bs-theme="light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn-search" type="submit">Search   <i class="fa fa-search"  aria-hidden="true"></i></button>
            <div className="profile">
              <Link to="/register" className="nav-link">
             Register
          </Link>
              <Link to="/login" className='nav-link'>Login</Link>
              <Link to="/profile"><i className="fas fa-user-circle" aria-hidden="true"></i>
</Link>
            </div>
            
        
          </form>
        </div>
      </nav>

      <div className="nav2">  
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link className="nav-link active" to="/home">Home</Link>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Categories</a>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/softtoys">Soft Toys</Link></li>
              <li><Link className="dropdown-item" to="#">Action Figures</Link></li>
              <li><Link className="dropdown-item" to="#">Building Blocks</Link></li>
              {/* <li><Link className="dropdown-item" to="#">Dolls & Accessories</Link></li>
              <li><Link className="dropdown-item" to="#">Remote Control Toys</Link></li>
              <li><Link className="dropdown-item" to="#">Educational Toys</Link></li>
              <li><Link className="dropdown-item" to="#">Board Games</Link></li>
              <li><Link className="dropdown-item" to="#">Musical Toys</Link></li>
              <li><Link className="dropdown-item" to="#">Outdoor Play</Link></li>
              <li><Link className="dropdown-item" to="#">Puzzle Toys</Link></li> */}
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Brands</a>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/lego">LEGO</Link></li>
              <li><Link className="dropdown-item" to="#">Mattel</Link></li>
              <li><Link className="dropdown-item" to="#">Hasbro</Link></li>
              {/* <li><Link className="dropdown-item" to="#">Fisher-Price</Link></li>
              <li><Link className="dropdown-item" to="#">Hot Wheels</Link></li>
              <li><Link className="dropdown-item" to="#">Barbie</Link></li>
              <li><Link className="dropdown-item" to="#">Nerf</Link></li>
              <li><Link className="dropdown-item" to="#">Play-Doh</Link></li>
              <li><Link className="dropdown-item" to="#">Melissa & Doug</Link></li>
              <li><Link className="dropdown-item" to="#">VTech</Link></li> */}
            </ul>
          </li>

          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Age Categories</a>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="#">0 – 12 Months</Link></li>
              <li><Link className="dropdown-item" to="#">1 – 2 Years</Link></li>
              <li><Link className="dropdown-item" to="#">3 – 4 Years</Link></li>
              <li><Link className="dropdown-item" to="#">5 – 6 Years</Link></li>
              <li><Link className="dropdown-item" to="#">7 – 8 Years</Link></li>
              <li><Link className="dropdown-item" to="#">9 – 10 Years</Link></li>
              <li><Link className="dropdown-item" to="#">11 – 12 Years</Link></li>
              <li><Link className="dropdown-item" to="#">13 – 15 Years</Link></li>
              <li><Link className="dropdown-item" to="#">16+ Years</Link></li>
              <li><Link className="dropdown-item" to="#">All Ages</Link></li>
            </ul>
          </li>
        </ul>

        <div className="details">
          <Link to="/about">About Us</Link>
          <Link to="/contact">Contact Us</Link>
         
          <Link to="#" className="nav-link">
            <i className="fa fa-heart"></i> Wishlist
          </Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
