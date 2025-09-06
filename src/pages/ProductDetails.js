import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTocart, deleteFromCart } from "../redux/Cartslice";
import allProducts from "../data/allProducts"; // include your products here

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart.cartitems);
  const [showDelivery, setShowDelivery] = useState(false);

  // find product by id
  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h3 className="text-center mt-5">Product not found</h3>;
  }

  const addCart = (item) => {
    dispatch(addTocart({ ...item, quantity: 1 }));
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="row">
        <div className="col-md-6">
          <img src={product.imgage} alt={product.title} className="img-fluid" />
        </div>

        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>
            <del>Rs.{product.initial_price}</del>{" "}
            <strong>Rs.{product.price}</strong>
          </p>

          {/* Add/Remove Cart */}
          {cartitems.find((item) => item.id === product.id) ? (
            <button
              className="btn btn-danger me-2"
              onClick={() => deleteCart(product)}
            >
              Remove from Cart
            </button>
          ) : (
            <button
              className="btn btn-primary me-2"
              onClick={() => addCart(product)}
            >
              Add to Cart
            </button>
          )}

          {/* Buy Now */}
          <button
            className="btn btn-success"
            onClick={() => setShowDelivery(true)}
          >
            Buy Now
          </button>

          {showDelivery && (
            <div className="alert alert-info mt-3">
              ✅ This item will be delivered in <strong>3–5 business days</strong>.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
