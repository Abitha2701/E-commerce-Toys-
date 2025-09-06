import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromCart, updateQuantity } from '../redux/Cartslice';
import './Cartpage.css';
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe("pk_test_51S0iteCkxII7b1vsU2H573EanlKNtjppUQIMnHOeMH5C4xhAokyWqJk10pkQmhaOl4hJPs30n3n7nOsOuweuIMPa00I05WqW2y"); 

const CartPage = () => {
  const cartitems = useSelector((state) => state.cart.cartitems);
  const dispatch = useDispatch();
  const stripePromise = loadStripe("pk_test_1234567890"); 

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
  };

  const incrementCart = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  };

  const decrementCart = (id, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ id, quantity: quantity - 1 }));
    }
  };

  const calculateTotal = () => {
    return cartitems.reduce((total, item) => {
      const cleanedPriceString = item.price?.toString().replace(/[^\d.]/g, '');
      const price = parseFloat(cleanedPriceString) || 0;
      const quantity = parseInt(item.quantity) || 1;
      return total + price * quantity;
    }, 0);
  };

const handleCheckout = async () => {
  try {
    const response = await fetch("http://localhost:6005/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [
          {
            priceId: "price_1S0iwgCkxII7b1vs7CDbp6aL", // use your Stripe Price ID
            quantity: 1
          }
        ]
      }),
    });

    const session = await response.json();

    if (!session.id) {
      throw new Error("No session ID returned from backend");
    }

    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (error) {
      console.error("Stripe redirect error:", error);
      alert(error.message);
    }
  } catch (err) {
    console.error("Checkout error:", err);
    alert("Checkout failed");
  }
};




  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      {cartitems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartitems.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <img src={item.imgage} alt={item.name} />
                  <p>Price: ₹{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="cart-buttons">
                  <button className="quantity-btn" onClick={() => incrementCart(item.id, item.quantity)}>+</button>
                  <button className="quantity-btn" onClick={() => decrementCart(item.id, item.quantity)}>-</button>
                  <button className="remove-btn" onClick={() => deleteCart(item)}>Remove</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total Price: ₹{calculateTotal().toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
