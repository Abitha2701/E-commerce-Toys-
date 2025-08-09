import React, { useState } from 'react';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    
  const [formData, setFormData] = useState({
    name: "",
    mail: "",
    number: "",
    password: "",
  });

    const [message, setMessage] = useState("");
  const Navigate = useNavigate();
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
        setMessage("Registered Successfully!");
       
        setFormData({name:"",mail:"",number:"",password:""});
        Navigate("/login")
    }
    else{
        setMessage("Registration Failed!");
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
        <h2>Register Now</h2>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="Enter your Username"
              id="name"
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
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );

}
export default Register;
