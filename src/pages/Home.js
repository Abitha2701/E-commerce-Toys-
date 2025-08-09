import React from 'react';
import './Home.css';
import img1 from '../images/toy1.avif';
import img2 from '../images/toy2.avif';
import img3 from '../images/toy3.avif';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  return (

    <div>
     <Header/>
      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={img1} className="d-block w-100" alt="Toy 1" />
          </div>
          <div className="carousel-item">
            <img src={img2} className="d-block w-100" alt="Toy 2" />
          </div>
          <div className="carousel-item">
            <img src={img3} className="d-block w-100" alt="Toy 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="extras">
        <div className="row text-center">
          <div className="col-3">
            <i className="fa-solid fa-truck"></i>
            <strong> Free Shipping</strong>
            <small> On everything</small>
          </div>
          <div className="col-3">
            <i className="fa-solid fa-phone"></i>
            <strong> Give Us A Call</strong>
            <small> Or Whatsapp on - <a href="https://wa.me/919638993429" target="_blank" rel="noopener noreferrer">9638993429</a></small>
          </div>
          <div className="col-3">
            <i className="fa-solid fa-boxes-stacked"></i>
            <strong> Bulk Inquiry</strong>
            <small> Email - <a href="mailto:Toycra@gmail.com">Toycra@gmail.com</a></small>
          </div>
          <div className="col-3">
            <i className="fa-solid fa-check-circle"></i>
            <strong> Toycra's Quality Assurance</strong>
            <small> Every product is original, fresh and of high quality</small>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
