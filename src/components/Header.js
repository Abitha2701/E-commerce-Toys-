import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import logo from "../images/logo1.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/AuthSlice";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from '@clerk/clerk-react';
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  // Voice search functions
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = sendAudio;

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error(err);
      if (err.name === 'NotFoundError') {
        alert("No microphone found. Please connect a microphone and try again.");
      } else if (err.name === 'NotAllowedError') {
        alert("Microphone access denied. Please allow microphone access in browser settings.");
      } else {
        alert("Error accessing microphone: " + err.message);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }

    streamRef.current?.getTracks().forEach(track => track.stop());

    setRecording(false);
  };

  const sendAudio = async () => {
    const blob = new Blob(chunksRef.current, { type: "audio/webm" });
    chunksRef.current = [];

    const formData = new FormData();
    formData.append("audio", blob);

    try {
      const res = await fetch("http://localhost:6005/api/voice/voice-search", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.text) {
        setSearchQuery(data.text);
        navigate(`/search?q=${encodeURIComponent(data.text)}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
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
            <button
              type="button"
              className="btn btn-outline-secondary me-2"
              onClick={recording ? stopRecording : startRecording}
              style={{
                borderRadius: "8px",
                background: recording ? "#dc3545" : "#6c757d",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                padding: "8px 12px"
              }}
              title={recording ? "Stop Recording" : "Voice Search"}
            >
              <i className="fa fa-microphone" aria-hidden="true"></i>
            </button>
            <button className="btn-search" type="submit">
              Search <i className="fa fa-search" aria-hidden="true"></i>
            </button>

            {/* Profile & Auth */}
            <div className="profile">
              <SignedOut>
                <SignInButton className="nav-link me-2" />
                <SignUpButton className="nav-link" />
              </SignedOut>
              <SignedIn>
                <UserButton />
                <Link to="/profile" className="nav-link ms-2">
                  <i className="fas fa-user-circle" aria-hidden="true"></i>
                </Link>
              </SignedIn>
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
