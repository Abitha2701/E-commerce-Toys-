import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTocart } from "../redux/Cartslice";
import "./ProductDetails.css";
import BackButton from "../components/BackButton";
import { useSelector } from "react-redux";
import { toggleWishlist } from "../redux/WishlistSlice";

function ProductDetails() {
  const location = useLocation();
  const product = location.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((s)=> s.wishlist.items);

  const [message, setMessage] = useState("");

  // 🗓️ Function to calculate expected delivery date
  const calculateExpectedDate = (delivery) => {
    if (!delivery) return null;

    const days = parseInt(delivery.match(/\d+/)?.[0] || 0, 10);
    if (!days) return null;

    const today = new Date();
    today.setDate(today.getDate() + days);

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
    // Step 1: Show message
    setMessage(
      `🚚 Your product will be delivered in ${product.delivery}${
        expectedDate ? ` (by ${expectedDate})` : ""
      }`
    );

    // Step 2: After 3 seconds, open Razorpay popup
    setTimeout(() => {
      setMessage(""); // clear message

      const options = {
        key: "rzp_test_RIxcFGVUeZMOtv", // ✅ Replace with your Razorpay Test Key ID
        amount: product.price * 100, // Amount in paise
        currency: "INR",
        name: "My Soft Toys Store",
        description: product.name,
        image: product.img || product.imgage,
        handler: function (response) {
          alert(
            "✅ Payment Successful! Payment ID: " + response.razorpay_payment_id
          );
          navigate("/"); // Redirect after success
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        notes: {
          product_id: product.id,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    }, 3000); // 3 seconds delay
  };

  return (
    <div className="product-details-page">
      {/* 🔙 Back button */}
      <BackButton className="page-back" />

      <div className="product-details-container">
        {/* Left side image */}
        <div className="product-image">
          <img src={product.img || product.imgage} alt={product.name} />
        </div>

        {/* Right side details */}
        <div className="product-info">
          <button
            className="pd-wishlist-heart"
            title="Toggle wishlist"
            onClick={()=> dispatch(toggleWishlist(product))}
          >
            <i className={"fa-heart " + (wishlistItems.some(i=>i.id===product.id)?"fas":"far")} aria-hidden="true"></i>
          </button>
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
