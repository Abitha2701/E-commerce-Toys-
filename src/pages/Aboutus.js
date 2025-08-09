import React from 'react'
import './Aboutus.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import about from '../images/toyshop.jpg'
import { Link } from 'react-router-dom'



const Aboutus = () => {
  return (


        <div className="about-container">
         <Header/>

      <div className="about-content">
        <img src={about} alt="Toy Shop" className="about-image" />
        <div className="about-text">
          <h2>About Us</h2>
          <p>
            At <strong>Toyshop</strong>, we believe that childhood should be filled with laughter, learning, and imagination.
            Established with a passion for spreading happiness, our toy shop is dedicated to offering a wide variety of toys that inspire joy in every child.
            <br /><br />
            From soft and cuddly teddy bears to creative art kits and educational puzzles, each toy is chosen carefully for its quality, safety, and ability to spark creativity. 
            We work closely with trusted brands and local artisans to ensure every product is both fun and meaningful.
            <br /><br />
            Our team is made up of parents, teachers, and toy lovers who understand the importance of play in child development.
            Whether you're shopping for a birthday gift, a learning tool, or a surprise to make your little one smile, we're here to help.
            <br /><br />
            Thank you for choosing HappyToys – where playtime becomes magical and memories are made.
          </p>
        </div>
      </div>
    </div>
  
  );
};

export default Aboutus
