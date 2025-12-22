import './Login.css';
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/AuthSlice';
import BackButton from '../components/BackButton';

const Login = () => {
  const [formData, setFormData] = useState({ mail: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      setMessage("You are already logged in. Redirecting to profile...");
      setTimeout(() => {
        if (user._id === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      }, 2000);
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const resultAction = await dispatch(loginUser(formData));

    if (loginUser.fulfilled.match(resultAction)) {
      setMessage("Logged in successfully! Redirecting...");
      setTimeout(() => {
        if (resultAction.payload._id === 'admin') {
          navigate('/admin');
        } else {
          navigate('/profile');
        }
      }, 2000);
    } else {
      setMessage(resultAction.payload || "Login failed");
    }
  };

  return (
    <div className='login'>
    <div className="login-container">
      <BackButton className="page-back" />
      <h2>Already a User? Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            id="mail"
            placeholder="Enter your email"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {(message || error) && <p className="error-message">{message || error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
        <div className='form-group'><Link to="/forgetpassword"> ForgetPassword???</Link></div>

    </div>
    </div>
  );
};

export default Login;
