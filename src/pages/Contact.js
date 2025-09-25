import React from 'react'
import './Contact.css'
import BackButton from '../components/BackButton'
const Contact = () => {
  return (
    <div>
      

      <div className="contact-container">
        <BackButton className="page-back" />
        <h2>Contact Us</h2>
        <p>Have a question or want to say hello? We'd love to hear from you!</p>

        <form className="contact-form">
          <div className="form-group">
            <label>Your Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea placeholder="Type your message..." rows="5" required></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>

  
   
     </div>
  );
};
   
 

export default Contact
