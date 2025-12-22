import React, { useState, useEffect } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BackButton from '../components/BackButton';

const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    number: "",
    password: "",
  });

    const [message, setMessage] = useState("");
  const Navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      setMessage("You are already logged in. Redirecting to profile...");
      setTimeout(() => {
        if (user._id === 'admin') {
          Navigate('/admin');
        } else {
          Navigate('/profile');
        }
      }, 2000);
    }
  }, [user, Navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload
    console.log("Data to be sent to server:", formData);

try{
    const response=await fetch("http://localhost:6005/upload",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
    });
    const result=await response.json();

    if(response.ok){
        setMessage("Registration successful! Redirecting to login...");

        setFormData({name:"",mail:"",number:"",password:""});

        // Check if registering as admin
        if (formData.mail === 'admin@admin.com') {
            alert('Admin account created! You can now login with admin@admin.com');
        }

        setTimeout(() => {
          Navigate("/login");
        }, 2000);
    }
    else{
        if (result.message === "User already exist") {
          setMessage("User already exists. Please login instead.");
        } else {
          setMessage("Registration Failed!");
        }
    }
}
    catch(error){
        console.log("Error:",error);
        setMessage("Server Error. Try again later.");
    }
}



  return (
    <div className='register'>

      <div className="register-container">
        <BackButton className="page-back" />
        <h2>Register Now</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="Enter your Username"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mail">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              id="mail"
              value={formData.mail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="number">Contact Number</label>
            <input
              type="text"
              placeholder="Enter mobile number"
              id="number"
              value={formData.number}
              maxLength="10"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {message && <p className={`message ${message.includes('Successfully') ? 'success' : 'error'}`}>{message}</p>}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );

}
export default Register;
