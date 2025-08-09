import './Login.css';
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [formData, setFormData] = useState({ mail: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:6005/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (res.ok) {
     

        console.log("Login user", result);
       localStorage.setItem("mail", result.user.mail);

        navigate("/profile");
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      console.error("Login error", error);
      setMessage("Server error");
    }
  };

  return (
    <div className='login'>
    <div className="login-container">
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

        {message && <p className="error-message">{message}</p>}

        <button type="submit">Login</button>
      </form>
        <div className='form-group'><Link to="/forgetpassword"> ForgetPassword???</Link></div>

    </div>
    </div>
  );
};

export default Login;
