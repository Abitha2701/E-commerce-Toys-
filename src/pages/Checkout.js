import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartitems = [], total = 0 } = location.state || {};

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    addressType: "Home",
    payment: "Razorpay",
  });

  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form
  const validateForm = () => {
    const { fullName, phone, address, city, pincode } = formData;
    if (!fullName || !phone || !address || !city || !pincode) return false;
    if (!/^\d{10}$/.test(phone)) return false;
    if (!/^\d{6}$/.test(pincode)) return false;
    return true;
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    if (!validateForm()) {
      setMessage("⚠️ Please fill all fields correctly!");
      return;
    }

    if (formData.payment === "Razorpay") {
      setMessage("💳 Redirecting to Razorpay...");
      // 👉 Integrate Razorpay SDK here
    } else {
      setMessage("✅ Order placed successfully with Cash on Delivery!");
    }

    setTimeout(() => {
      setMessage("");
      navigate("/"); // Redirect to homepage or order summary
    }, 3000);
  };

  return (
    <div className="checkout-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>

      <h2 className="checkout-title">Checkout</h2>

      <div className="checkout-container">
        {/* Shipping Address */}
        <div className="checkout-section">
          <h3>Shipping Address</h3>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
        </div>

        {/* Address Type */}
      {/* Address Type */}
<div className="checkout-section">
  <h3>Address Type</h3>
  <div className="radio-group">
    <label>
      <input
        type="radio"
        name="addressType"
        value="Home"
        checked={formData.addressType === "Home"}
        onChange={handleChange}
      />
      <span>Home</span>
    </label>
    <label>
      <input
        type="radio"
        name="addressType"
        value="Office"
        checked={formData.addressType === "Office"}
        onChange={handleChange}
      />
      <span>Office</span>
    </label>
  </div>
</div>

{/* Payment Method */}
<div className="checkout-section">
  <h3>Payment Method</h3>
  <div className="radio-group">
    <label>
      <input
        type="radio"
        name="payment"
        value="Razorpay"
        checked={formData.payment === "Razorpay"}
        onChange={handleChange}
      />
      <span>Razorpay (UPI, Card, Netbanking)</span>
    </label>
    <label>
      <input
        type="radio"
        name="payment"
        value="COD"
        checked={formData.payment === "COD"}
        onChange={handleChange}
      />
      <span>Cash on Delivery</span>
    </label>
  </div>
</div>

        {/* Order Summary */}
     {/* Order Summary */}
<div className="checkout-section order-summary">
  <h3>Order Summary</h3>
  {cartitems.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <>
      {cartitems.map((item) => {
        // Ensure price is a number
        const price = typeof item.price === "string" 
          ? parseFloat(item.price.replace(/[^\d.]/g, "")) 
          : Number(item.price) || 0;

        return (
          <div key={item.id} className="summary-item">
            <p>{item.name} x {item.quantity}</p>
            <p>₹{(price * item.quantity).toFixed(2)}</p>
          </div>
        );
      })}
      <hr />
      <h4>Total: ₹{total.toFixed(2)}</h4>
    </>
  )}
</div>


        {/* Place Order */}
        <div className="place-order">
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
          {message && <p className="message-box">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
