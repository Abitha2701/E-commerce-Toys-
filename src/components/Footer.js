import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div>
      <footer className="footer">
  <div className="container">
    <div className="footer-section">
      <h4>Toycra</h4>
      <p>Premium quality toys for every age. Safe, original, and fun!</p>
    </div>

    <div className="footer-section">
      <h5>Quick Links</h5>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Shop</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>

    <div className="footer-section">
      <h5>Contact</h5>
      <p>Email: <a href="mailto:toycra@gmail.com">toycra@gmail.com</a></p>
      <p>Phone: <a href="tel:+919638993429">+91 96389 93429</a></p>
    </div>
  </div>
  <div className="footer-bottom">
    &copy; 2025 Toycra. All rights reserved.
  </div>
</footer>
</div>
)
}
export default Footer
