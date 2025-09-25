// src/pages/SearchResults.js
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../redux/Cartslice";
import allProducts from "../data/allProducts";
import BackButton from "../components/BackButton";
import "./SearchResults.css";
import { toggleWishlist } from "../redux/WishlistSlice";

const SearchResults = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q")?.toLowerCase() || "";
  const wishlistItems = useSelector((s) => s.wishlist.items);

  // Filter products from all lists
  const filteredProducts = allProducts.filter((item) => {
    const name = item.name || item.title || "";
    return name.toLowerCase().includes(searchTerm);
  });

  const [feedback, setFeedback] = useState({}); // { [productId]: 'Added to cart!' }

  const handleAdd = (product) => {
    // Normalize data similar to other pages
    const cleanedPrice = parseFloat((product.price ?? product.initial_price)?.toString().replace(/[^\d.]/g, "")) || 0;
    const updated = {
      ...product,
      name: product.name || product.title,
      price: cleanedPrice,
      quantity: product.quantity || 1,
    };
    dispatch(addTocart(updated));
    setFeedback((prev) => ({ ...prev, [product.id]: "Added to cart!" }));
    setTimeout(() => {
      setFeedback((prev) => {
        const next = { ...prev };
        delete next[product.id];
        return next;
      });
    }, 1800);
  };

  return (
    <div className="sr-container container mt-4">
      {/* Back Button */}
      <BackButton className="page-back mb-3" />

      <h2>Search Results for: "{searchTerm}"</h2>

      {filteredProducts.length > 0 ? (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-3">
              <div className="card h-100 sr-card">
                <img
                  src={product.imgage}
                  className="card-img-top sr-image"
                  alt={product.name || product.title}
                />
                <button
                  className="wishlist-heart"
                  title="Toggle wishlist"
                  onClick={() => dispatch(toggleWishlist({
                    ...product,
                    name: product.name || product.title,
                  }))}
                >
                  <i className={"fa-heart " + (wishlistItems.some(i=>i.id===product.id) ? "fas" : "far")} aria-hidden="true"></i>
                </button>

                <div className="card-body sr-body">
                  <h5 className="card-title sr-title">{product.name || product.title}</h5>
                  <p className="card-text sr-desc">{product.description}</p>
                  <p className="sr-price">
                    <del>₹{product.initial_price}</del>{" "}
                    <strong>₹{product.price}</strong>
                  </p>
                  <div className="d-flex align-items-center gap-2">
                    <button
                      className="btn btn-primary sr-add-btn"
                      onClick={() => handleAdd(product)}
                    >
                      🛒 Add to Cart
                    </button>
                  </div>
                  {feedback[product.id] && (
                    <div className="added-msg" role="status">{feedback[product.id]}</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
