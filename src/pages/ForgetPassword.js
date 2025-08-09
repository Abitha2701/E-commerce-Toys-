import React from 'react'
import {useState} from "react"
import { useNavigate} from 'react-router-dom'
import './ForgetPassword.css'
const ForgetPassword =() => {
  const [formData, setFormData] = useState({ mail: "", newPassword: "" });
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
      const res = await fetch("http://localhost:6005/reset-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(result.user));
        console.log("Login user", result);
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
      <h2>Password reset</h2>

      <form className="login-form" onSubmit={handleSubmit} >
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="mail"
            id="mail"
            placeholder="Enter your mail"
            value={formData.mail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            id="newPassword"
            placeholder="Enter New password"
            value={formData.newPassword}
            onChange={handleChange}
            required
          />
        </div>

        {message && <p className="error-message">{message}</p>}

        <button type="submit">Reset Password</button>
      </form>
    </div>
    </div>
  )
}

export default ForgetPassword;
