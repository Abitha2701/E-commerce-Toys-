import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTocart } from "../redux/Cartslice";
import "./ProductDetails.css";

function ProductDetails() {
  const location = useLocation();
  const product = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  // 🗓️ Function to calculate expected delivery date
  const calculateExpectedDate = (delivery) => {
    if (!delivery) return null;

    // Extract number from delivery string (e.g., "5 days")
    const days = parseInt(delivery.match(/\d+/)?.[0] || 0, 10);

    if (!days) return null;

    const today = new Date();
    today.setDate(today.getDate() + days);

    // Format date as: "Friday, September 6, 2025"
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const expectedDate = calculateExpectedDate(product.delivery);

  const handleAddToCart = () => {
    dispatch(addTocart(product));
    setMessage("✅ Item added to cart!");
    setTimeout(() => setMessage(""), 2500);
  };

  const handleBuyNow = () => {
    setMessage(
      `🚚 Your product will be delivered in ${product.delivery}${
        expectedDate ? ` (by ${expectedDate})` : ""
      }`
    );
    setTimeout(() => setMessage(""), 10000);
  };

  return (
    <div className="product-details-page">
      {/* 🔙 Back button */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <div className="product-details-container">
        {/* Left side image */}
        <div className="product-image">
          <img src={product.img || product.imgage} alt={product.name} />
        </div>

        {/* Right side details */}
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">€{product.price}</p>

          {/* Delivery Info */}
          <p className="delivery-info">
            Estimated Delivery: {product.delivery}
            {expectedDate && <span> (by {expectedDate})</span>}
          </p>

          <p className="product-description">{product.description}</p>

          {/* Buttons side by side */}
          <div className="buttons">
            <button className="add-btn" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          {/* Success / Info message */}
          {message && <p className="message-box">{message}</p>}

          {/* Extras */}
          <div className="extras">
            <div>🚚 Free Worldwide Shipping*</div>
            <div>🔄 Easy 60-Day Exchanges & Returns</div>
            <div>📞 24/7 Customer Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
