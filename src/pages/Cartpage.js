import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteFromCart, updateQuantity } from '../redux/Cartslice';
import './Cartpage.css';

const CartPage = () => {
  const cartitems = useSelector((state) => state.cart.cartitems);
  const dispatch = useDispatch();

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

  const handleCheckout = () => {
    alert('Proceeding to checkout...');
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
