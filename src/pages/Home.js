import React from 'react';
import './Home.css';
import img1 from '../images/toy1.avif';
import img2 from '../images/toy2.avif';
import img3 from '../images/toy3.avif';
import legoimg from '../images/lego2.webp';
import dollHero from '../images/doll.jpg';
import AIAssistant from '../components/AIAssistant';

const Home = () => {
  return (
    <div>
      <div id="carouselExampleAutoplaying" className="carousel slide home-hero" data-bs-ride="carousel">
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

        {/* Hero overlay */}
        <div className="hero-overlay container">
          <h1>Bring Smiles. Spark Imaginations.</h1>
          <p>Discover soft toys, LEGO sets, and more curated for joyful play and learning.</p>
          <div className="hero-cta">
            <a href="#featured" className="btn btn-primary">Shop Featured</a>
            <a href="/softtoys" className="btn btn-">Explore Soft Toys</a>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section id="featured" className="featured-categories container py-4">
        <div className="row g-3">
          <div className="col-md-6">
            <a className="fc-card" href="/softtoys">
              <img src={dollHero} alt="Soft Toys" />
              <div className="fc-info">
                <h3>Soft Toys</h3>
                <p>Snuggly friends for endless cuddles.</p>
              </div>
            </a>
          </div>
          <div className="col-md-6">
            <a className="fc-card" href="/lego">
              <img src={legoimg} alt="LEGO" />
              <div className="fc-info">
                <h3>LEGO</h3>
                <p>Build, learn, and create masterpieces.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Trending Callout */}
      <section className="trending container py-3">
        <div className="trending-box">
          <h4>Trending Now</h4>
          <ul>
            <li>Top picks for ages 3–6</li>
            <li>STEM-friendly building sets</li>
            <li>Huggable plush bestsellers</li>
          </ul>
        </div>
      </section>

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

      {/* Testimonials */}
      <section className="testimonials container py-4">
        <div className="row g-3">
          <div className="col-md-4">
            <div className="t-card">
              <p>"My kid loves the soft toys! Super soft and safe."</p>
              <span>— Asha, Pune</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="t-card">
              <p>"Great LEGO selection. Fast delivery!"</p>
              <span>— Rohan, Bengaluru</span>
            </div>
          </div>
          <div className="col-md-4">
            <div className="t-card">
              <p>"Quality products and amazing support."</p>
              <span>— Neha, Mumbai</span>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter container py-4">
        <div className="newsletter-box">
          <h4>Join our Toy Club</h4>
          <p>Get exclusive offers, new arrivals, and playful inspiration.</p>
          <form className="newsletter-form" onSubmit={(e)=> e.preventDefault()}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
        
      </section>
        <AIAssistant />
    </div>
    
  );
};

export default Home;
