import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { uploadProduct, resetUploadStatus, fetchProducts } from '../redux/ProductSlice';
import { logoutUser } from '../redux/AuthSlice';
import BackButton from '../components/BackButton';
import './Admin.css';

const Admin = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uploadStatus, uploadError, products } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    initial_price: '',
    priceId: '',
    image: null
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if user is admin
    if (!user || user._id !== 'admin') {
      navigate('/login');
      return;
    }

    // Fetch products when component mounts
    dispatch(fetchProducts());

    if (uploadStatus === 'succeeded') {
      setMessage('Product uploaded successfully!');
      setFormData({
        name: '',
        description: '',
        price: '',
        initial_price: '',
        priceId: '',
        image: null
      });
      // Reset file input
      document.getElementById('image').value = '';
      dispatch(resetUploadStatus());
      // Refresh products list
      dispatch(fetchProducts());
    } else if (uploadStatus === 'failed') {
      setMessage(uploadError || 'Failed to upload product');
      dispatch(resetUploadStatus());
    }
  }, [uploadStatus, uploadError, dispatch, user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price);
    formDataToSend.append('initial_price', formData.initial_price || formData.price);
    formDataToSend.append('priceId', formData.priceId);
    formDataToSend.append('image', formData.image);

    dispatch(uploadProduct(formDataToSend));
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  // Don't render if not admin
  if (!user || user._id !== 'admin') {
    return null;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <BackButton label="Back to Home" />
        <h1>Admin Panel</h1>
        <p>Upload new products to the store</p>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <div className="admin-content">
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (₹) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="initial_price">Initial Price (₹)</label>
              <input
                type="number"
                id="initial_price"
                name="initial_price"
                value={formData.initial_price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                placeholder="Leave empty to use current price"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="priceId">Stripe Price ID</label>
            <input
              type="text"
              id="priceId"
              name="priceId"
              value={formData.priceId}
              onChange={handleInputChange}
              placeholder="Optional - for Stripe payments"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Product Image *</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              required
            />
          </div>

          {message && (
            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <button type="submit" disabled={uploadStatus === 'loading'} className="upload-btn">
            {uploadStatus === 'loading' ? 'Uploading...' : 'Upload Product'}
          </button>
        </form>

        {/* Uploaded Products Section */}
        <div className="uploaded-products">
          <h2>Uploaded Products ({products.length})</h2>
          {products.length === 0 ? (
            <p>No products uploaded yet.</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div key={product.id || product._id} className="product-card">
                  <img
                    src={product.img || product.imgage}
                    alt={product.name}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3>{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">
                      <span className="current-price">₹{product.price}</span>
                      {product.initial_price && product.initial_price !== product.price && (
                        <span className="initial-price">₹{product.initial_price}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
