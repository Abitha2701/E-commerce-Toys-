import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Softtoys.css';
import main from '../images/doll.jpg';
import card1 from '../images/teddy.webp';
import card2 from '../images/unicorn.webp';
import card3 from '../images/girl.webp';
import card4 from '../images/teddy1.webp';
import card5 from '../images/dog.webp';
import card6 from '../images/teddy3.webp';
import card7 from '../images/lion.webp';
import card8 from '../images/dragon.webp';
import card9 from '../images/img1.webp';
import card10 from '../images/img2.webp';
import card11 from '../images/img3.webp';
import card12 from '../images/img17.webp';
import card13 from '../images/img5.webp';
import card14 from '../images/img6.webp';
import card15 from '../images/img7.webp';
import card16 from '../images/img8.jpg';
import card17 from '../images/img16.webp';
import card18 from '../images/img9.webp';
import card19 from '../images/img10.webp';
import card20 from '../images/img11.webp';
import card21 from '../images/img12.webp';
import card22 from '../images/img13.webp';
import card23 from '../images/img14.webp';
import card24 from '../images/img15.webp';
import { useSelector, useDispatch } from 'react-redux';
import { addTocart, deleteFromCart } from '../redux/Cartslice';
import { useNavigate } from 'react-router-dom';

const Softtoys = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartitems = useSelector((state) => state.cart.cartitems);

  const addCart = (item) => {
    const cleanedPrice = parseFloat(item.price?.toString().replace(/[^\d.]/g, '')) || 0;
    const updatedProduct = {
      ...item,
      price: cleanedPrice,
      quantity: item.quantity || 1,
    };
    dispatch(addTocart(updatedProduct));
  };

  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
  };

  const menu = [
    {
      id: 1,
      quantity: 1,
      imgage: card1,
      title: "Brown Bear",
      description: "Large soft brown teddy bear perfect for hugging and bedtime comfort.",
      initial_price: 900,
      price: 500,
      delivery: "Delivery in 3–5 days",
      material: "Plush Fabric, Cotton Filling",
      size: "60 cm",
      age: "3+ years",
      features: "Super soft, washable, safe for kids"
    },
    {
      id: 2,
      quantity: 1,
      imgage: card2,
      title: "Unicorn",
      description: "Magical red unicorn soft toy with sparkling details for fantasy play.",
      initial_price: 900,
      price: 500,
      delivery: "Delivery in 4–6 days",
      material: "Velvet Plush, Polyester Fiber",
      size: "45 cm",
      age: "3+ years",
      features: "Sparkly horn, colorful mane, durable stitching"
    },
    {
      id: 3,
      quantity: 1,
      imgage: card3,
      title: "Cute Girl Doll",
      description: "Adorable plush doll with cute outfit, perfect for storytelling fun.",
      initial_price: 800,
      price: 500,
      delivery: "Delivery in 2–4 days",
      material: "Soft Fabric, Cotton Stuffing",
      size: "40 cm",
      age: "2+ years",
      features: "Removable dress, soft hair, non-toxic material"
    },
    {
      id: 4,
      quantity: 1,
      imgage: card4,
      title: "Hug Bear",
      description: "Large soft brown teddy bear perfect for hugging and bedtime comfort.",
      initial_price: 800,
      price: 500,
      delivery: "Delivery in 5–7 days",
      material: "Plush, Cotton Filling",
      size: "70 cm",
      age: "3+ years",
      features: "Extra soft fur, easy to wash"
    },
    {
      id: 5,
      quantity: 1,
      imgage: card5,
      title: "Plush Puppy",
      description: "Soft and friendly puppy plush toy for animal lovers of all ages.",
      initial_price: 750,
      price: 500,
      delivery: "Delivery in 3–5 days",
      material: "Velvet, Cotton Stuffing",
      size: "35 cm",
      age: "3+ years",
      features: "Cute floppy ears, washable fabric"
    },
    {
      id: 6,
      quantity: 1,
      imgage: card6,
      title: "Cuddle Cub",
      description: "Soft cub teddy designed for maximum cuddle comfort during naps.",
      initial_price: 750,
      price: 500,
      delivery: "Delivery in 2–4 days",
      material: "Plush, Cotton Filling",
      size: "40 cm",
      age: "2+ years",
      features: "Lightweight, safe for toddlers"
    },
    {
      id: 7,
      quantity: 1,
      imgage: card7,
      title: "Lion Buddy",
      description: "Large soft lion plush with a fluffy mane, perfect for jungle adventures.",
      initial_price: 750,
      price: 500,
      delivery: "Delivery in 5–7 days",
      material: "Soft Plush, Polyester Fiber",
      size: "55 cm",
      age: "4+ years",
      features: "Fluffy mane, durable stitching"
    },
    {
      id: 8,
      quantity: 1,
      imgage: card8,
      title: "Dragon Plush",
      description: "Soft dragon plush with wings and tail, perfect for mythical playtime.",
      initial_price: 800,
      price: 500,
      delivery: "Delivery in 4–6 days",
      material: "Velvet Plush",
      size: "50 cm",
      age: "3+ years",
      features: "Soft wings, safe fabric, washable"
    },
    {
      id: 9,
      quantity: 1,
      imgage: card9,
      title: "Giraffe Plush",
      description: "Play Hour Ring Giraffe Plush Soft Toy for Ages 3 Years and Up, Green, 45cm",
      initial_price: 950,
      price: 700,
      delivery: "Delivery in 3–5 days",
      material: "Soft Plush, Cotton Filling",
      size: "45 cm",
      age: "3+ years",
      features: "Colorful design, lightweight"
    },
    {
      id: 10,
      quantity: 1,
      imgage: card10,
      title: "Panda Pal",
      description: "Play Hour Giant Bamboo Panda Plush Soft Toy for Ages 3 Years and Up - Grey, 55cm",
      initial_price: 1100,
      price: 800,
      delivery: "Delivery in 4–6 days",
      material: "Plush Fabric",
      size: "55 cm",
      age: "3+ years",
      features: "Adorable bamboo design, soft stuffing"
    },
    {
      id: 11,
      quantity: 1,
      imgage: card11,
      title: "Fashion Girl",
      description: "Adorable plush doll with cute outfit, perfect for storytelling fun.",
      initial_price: 800,
      price: 500,
      delivery: "Delivery in 2–4 days",
      material: "Soft Fabric",
      size: "35 cm",
      age: "2+ years",
      features: "Stylish dress, safe materials"
    },
    {
      id: 12,
      quantity: 1,
      imgage: card12,
      title: "Hoodie Duck",
      description: "Play Hour Hoodie Duck Plush Soft Toy for Ages 3 Years and Up - Grey, 25cm",
      initial_price: 1000,
      price: 900,
      delivery: "Delivery in 3–5 days",
      material: "Soft Plush",
      size: "25 cm",
      age: "3+ years",
      features: "Cute hoodie, bright color"
    },
    {
      id: 13,
      quantity: 1,
      imgage: card13,
      title: "Masha Bear",
      description: "Simba Masha and The Bear 40cm Plush Soft Teddy Bear for Kids",
      initial_price: 1000,
      price: 800,
      delivery: "Delivery in 4–6 days",
      material: "Plush Fabric",
      size: "40 cm",
      age: "3+ years",
      features: "Based on TV character, washable"
    },
    {
      id: 14,
      quantity: 1,
      imgage: card14,
      title: "Royal Elephant",
      description: "Elephant Plush Soft Toy with Crown for Ages 3 Years and Up - 45cm",
      initial_price: 1100,
      price: 900,
      delivery: "Delivery in 5–7 days",
      material: "Plush, Polyester Fiber",
      size: "45 cm",
      age: "3+ years",
      features: "Cute crown design, soft ears"
    },
    {
      id: 15,
      quantity: 1,
      imgage: card15,
      title: "Pink Dress Doll",
      description: "Winky Rag Doll Plush Soft Toy Wearing Pink Dress for Ages 3 Years and Up",
      initial_price: 1000,
      price: 850,
      delivery: "Delivery in 3–5 days",
      material: "Soft Cloth",
      size: "35 cm",
      age: "2+ years",
      features: "Cute dress, soft cotton hair"
    },
    {
      id: 16,
      quantity: 1,
      imgage: card16,
      title: "Knitted Doll",
      description: "Clapjoy Soft Hand Knitted Cotton Thread Doll For Kids",
      initial_price: 950,
      price: 700,
      delivery: "Delivery in 2–4 days",
      material: "Knitted Cotton",
      size: "30 cm",
      age: "2+ years",
      features: "Handmade, eco-friendly"
    },
    {
      id: 17,
      quantity: 1,
      imgage: card17,
      title: "Brown Bear",
      description: "Large soft brown teddy bear perfect for hugging and bedtime comfort.",
      initial_price: 900,
      price: 500,
      delivery: "Delivery in 3–5 days",
      material: "Plush Fabric",
      size: "55 cm",
      age: "3+ years",
      features: "Soft fur, huggable"
    },
    {
      id: 18,
      quantity: 1,
      imgage: card18,
      title: "Unicorn",
      description: "Magical red unicorn soft toy with sparkling details for fantasy play",
      initial_price: 900,
      price: 500,
      delivery: "Delivery in 4–6 days",
      material: "Velvet Plush",
      size: "50 cm",
      age: "3+ years",
      features: "Colorful mane, durable stitching"
    },
    {
      id: 19,
      quantity: 1,
      imgage: card19,
      title: "Doll",
      description: "Adorable plush doll with cute outfit, perfect for storytelling fun.",
      initial_price: 800,
      price: 500,
      delivery: "Delivery in 2–4 days",
      material: "Fabric",
      size: "35 cm",
      age: "2+ years",
      features: "Removable clothes, safe fabric"
    },
    {
      id: 20,
      quantity: 1,
      imgage: card20,
      title: "Hug Bear",
      description: "Large soft brown teddy bear perfect for hugging and bedtime comfort.",
      initial_price: 800,
      price: 500,
      delivery: "Delivery in 5–7 days",
      material: "Plush",
      size: "60 cm",
      age: "3+ years",
      features: "Super soft fur, washable"
    },
    {
      id: 21,
      quantity: 1,
      imgage: card21,
      title: "Plush Puppy",
      description: "Soft and friendly puppy plush toy for animal lovers of all ages.",
      initial_price: 750,
      price: 500,
      delivery: "Delivery in 3–5 days",
      material: "Velvet Plush",
      size: "40 cm",
      age: "3+ years",
      features: "Floppy ears, soft stuffing"
    },
    {
      id: 22,
      quantity: 1,
      imgage: card22,
      title: "Cuddle Cub",
      description: "Soft cub teddy designed for maximum cuddle comfort during naps.",
      initial_price: 750,
      price: 500,
      delivery: "Delivery in 2–4 days",
      material: "Soft Plush",
      size: "35 cm",
      age: "2+ years",
      features: "Safe fabric, cute design"
    },
    {
      id: 23,
      quantity: 1,
      imgage: card23,
      title: "Lion Buddy",
      description: "Large soft lion plush with a fluffy mane, perfect for jungle adventures.",
      initial_price: 750,
      price: 500,
      delivery: "Delivery in 5–7 days",
      material: "Plush, Polyester Fiber",
      size: "55 cm",
      age: "4+ years",
      features: "Fluffy mane, durable build"
    },
    {
      id: 24,
      quantity: 1,
      imgage: card24,
      title: "Dragon Plush",
      description: "Soft dragon plush with wings and tail, perfect for mythical playtime.",
      initial_price: 800,
      price: 500,
      delivery: "Delivery in 4–6 days",
      material: "Velvet Plush",
      size: "50 cm",
      age: "3+ years",
      features: "Soft wings, washable material"
    },
  ];

  return (
    <div>
      <Header />
      <div className="doll-section">
        <div className="doll-text">
          <h3>Adorable Dolls for Every Child</h3>
          <p>
            Discover our enchanting range of dolls that are crafted to capture every child's heart and imagination.
            Whether it's cuddly baby dolls, stylish fashion dolls, or themed characters, our selection offers something
            for every personality and age group.
          </p>
        </div>
        <div className="doll-image">
          <img src={main} alt="Cute Doll" />
        </div>
      </div>

      <div className="cards">
        {menu.map((item) => (
          <div className="card col-3" key={item.id} style={{ width: "18rem" }}>
            <img
              src={item.imgage}
              className="card-img-top"
              alt={item.title}
              style={{ height: "200px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">
                {item.description.length > 50
                  ? item.description.slice(0, 50) + "..."
                  : item.description}
              </p>
              <p className="money">
                <del>Rs.{item.initial_price}</del> Rs.{item.price}
              </p>

              {cartitems.find((reduxdata) => reduxdata.id === item.id) ? (
                <button
                  className="remove-btn btn btn-danger w-100"
                  onClick={() => deleteCart(item)}
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="add-btn btn btn-primary w-100"
                  onClick={() => addCart(item)}
                >
                  Add to Cart
                </button>
              )}

              <button
                className="btn btn-outline-secondary mt-2 w-100"
                onClick={() => navigate(`/product/${item.id}`, { state: item })}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Softtoys;
