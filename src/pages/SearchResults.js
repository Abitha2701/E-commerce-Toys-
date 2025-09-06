// src/pages/SearchResults.js
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addTocart } from "../redux/Cartslice";
import allProducts from "../data/allProducts";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q")?.toLowerCase() || "";

  // Filter products from all lists
  const filteredProducts = allProducts.filter((item) => {
    const name = item.name || item.title || "";
    return name.toLowerCase().includes(searchTerm);
  });

  return (
    <div className="container mt-4">
      {/* Back Button */}
      <button
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <h2>Search Results for: "{searchTerm}"</h2>

      {filteredProducts.length > 0 ? (
        <div className="row">
          {filteredProducts.map((product) => (
            <div key={product.id} className="col-md-4 mb-3">
              <div className="card h-100">
                <img
                  src={product.imgage}
                  className="card-img-top"
                  alt={product.name || product.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name || product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p>
                    <del>₹{product.initial_price}</del>{" "}
                    <strong>₹{product.price}</strong>
                  </p>
                  {/* Add to Cart button (Redux) */}
                  <button
                    className="btn btn-primary"
                    onClick={() => dispatch(addTocart(product))}
                  >
                    🛒 Add to Cart
                  </button>
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
