import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTocart } from "../redux/Cartslice";
import { toggleWishlist } from "../redux/WishlistSlice";
import BackButton from "../components/BackButton";
import "./Wishlist.css";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.wishlist.items);

  const handleAdd = (product) => {
    // Normalize as elsewhere
    const cleanedPrice = parseFloat((product.price ?? product.initial_price)?.toString().replace(/[^\d.]/g, "")) || 0;
    const updated = {
      ...product,
      price: cleanedPrice,
      quantity: product.quantity || 1,
    };
    dispatch(addTocart(updated));
  };

  return (
    <div className="wishlist-page container py-3">
      <BackButton className="page-back mb-2" />
      <h2 className="mb-3">Your Wishlist</h2>

      {items.length === 0 ? (
        <div className="empty-wishlist">
          <p>No items in wishlist.</p>
          <Link to="/softtoys" className="btn btn-primary">Browse Products</Link>
        </div>
      ) : (
        <div className="row">
          {items.map((product) => (
            <div key={product.id} className="col-md-4 mb-3">
              <div className="card h-100 wl-card">
                <img
                  src={product.img || product.imgage}
                  className="card-img-top wl-image"
                  alt={product.name || product.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <button
                  className="wishlist-heart active"
                  title="Remove from wishlist"
                  onClick={() => dispatch(toggleWishlist(product))}
                >
                  <i className="fas fa-heart" aria-hidden="true"></i>
                </button>
                <div className="card-body wl-body">
                  <h5 className="card-title wl-title">{product.name || product.title}</h5>
                  {product.description && (
                    <p className="card-text wl-desc">{product.description}</p>
                  )}
                  <p className="wl-price">
                    {product.initial_price && <del>₹{product.initial_price}</del>} {" "}
                    {product.price && <strong>₹{product.price}</strong>}
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAdd(product)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
