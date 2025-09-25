import React from "react";
import "./Lego.css";
import legoimg from "../images/lego2.webp";
import product1 from "../images/brickbox.jpg";
import product2 from "../images/princess.webp";
import product3 from "../images/space-build.webp";
import product4 from "../images/music-tour.webp";
import product5 from "../images/robo.webp";
import product6 from "../images/tiger.webp";
import product7 from "../images/cat.webp";
import product8 from "../images/harry-potter.webp";
import product9 from "../images/img28.webp";
import product10 from "../images/img20.webp";
import product11 from "../images/img21.webp";
import product12 from "../images/img22.webp";
import product13 from "../images/img23.webp";
import product14 from "../images/img24.webp";
import product15 from "../images/img25.webp";
import product16 from "../images/img26.webp";
import product17 from "../images/img27.webp";

import { useSelector, useDispatch } from "react-redux";
import { addTocart, deleteFromCart } from "../redux/Cartslice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { toggleWishlist } from "../redux/WishlistSlice";
import BackButton from "../components/BackButton";

const Lego = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartitems = useSelector((state) => state.cart.cartitems);
  const wishlistItems = useSelector((s)=> s.wishlist.items);

  const addCart = (product) => {
    const cleanedPrice =
      parseFloat(product.price?.toString().replace(/[^\d.]/g, "")) || 0;
    const updatedProduct = {
      ...product,
      price: cleanedPrice,
      quantity: product.quantity || 1,
    };
    dispatch(addTocart(updatedProduct));
  };

  const deleteCart = (product) => {
    dispatch(deleteFromCart(product));
  };

  // LEGO product list
 const menu2 = [
  {
    id: 30,
    quantity: 1,
    imgage: product1,
    title: "LEGO Classic Brick Box",
    description:
      "Unleash your creativity with this LEGO Classic Brick Box—ideal for open-ended building fun for all ages.",
    initial_price: 900,
    price: 500,
    delivery: "Delivery in 3–5 days",
    material: "ABS Plastic",
    size: "500+ pieces",
    age: "4+ years",
    features: "Encourages creativity, durable bricks, reusable box",
  },
  {
    id: 31,
    quantity: 1,
    imgage: product2,
    title: "LEGO Disney Princess Castle",
    description:
      "Bring fairytales to life with the LEGO Princess Castle—perfect for fans of magic, adventure, and storytelling.",
    initial_price: 1000,
    price: 800,
    delivery: "Delivery in 4–6 days",
    material: "ABS Plastic",
    size: "400+ pieces",
    age: "6+ years",
    features: "Castle build, mini-figures, colorful design",
  },
  {
    id: 32,
    quantity: 1,
    imgage: product3,
    title: "LEGO Space Explorer",
    description:
      "Blast off into fun with this LEGO Space set—design spacecrafts and start your own intergalactic mission.",
    initial_price: 800,
    price: 500,
    delivery: "Delivery in 3–5 days",
    material: "ABS Plastic",
    size: "350+ pieces",
    age: "6+ years",
    features: "Space shuttle, astronaut mini-fig, sturdy build",
  },
  {
    id: 33,
    quantity: 1,
    imgage: product4,
    title: "LEGO Friends Music Tour",
    description:
      "Join the LEGO Friends on their world tour—build instruments, stages, and play out musical dreams!",
    initial_price: 700,
    price: 500,
    delivery: "Delivery in 5–7 days",
    material: "ABS Plastic",
    size: "300+ pieces",
    age: "6+ years",
    features: "Stage setup, musical instruments, fun roleplay",
  },
  {
    id: 34,
    quantity: 1,
    imgage: product5,
    title: "LEGO Robot Inventor",
    description:
      "Build, code, and play with LEGO's Robot Inventor set—perfect for young engineers and innovators.",
    initial_price: 900,
    price: 500,
    delivery: "Delivery in 4–6 days",
    material: "ABS Plastic + electronics",
    size: "400+ pieces",
    age: "8+ years",
    features: "Programmable, interactive play, coding support",
  },
  {
    id: 35,
    quantity: 1,
    imgage: product6,
    title: "LEGO Tiger Jungle",
    description:
      "Step into the wild with LEGO Tiger Jungle and bring the animal kingdom to life.",
    initial_price: 950,
    price: 650,
    delivery: "Delivery in 3–5 days",
    material: "ABS Plastic",
    size: "380+ pieces",
    age: "6+ years",
    features: "Tiger build, jungle environment, creative play",
  },
  {
    id: 36,
    quantity: 1,
    imgage: product7,
    title: "LEGO Cat Creator",
    description:
      "Build adorable cats with this LEGO Creator set—purrfect for animal lovers!",
    initial_price: 850,
    price: 550,
    delivery: "Delivery in 3–5 days",
    material: "ABS Plastic",
    size: "320+ pieces",
    age: "6+ years",
    features: "Multiple cat builds, creative design",
  },
  {
    id: 37,
    quantity: 1,
    imgage: product8,
    title: "LEGO Harry Potter Castle",
    description:
      "Step into the magical world of Hogwarts with LEGO Harry Potter Castle.",
    initial_price: 1200,
    price: 900,
    delivery: "Delivery in 5–7 days",
    material: "ABS Plastic",
    size: "500+ pieces",
    age: "7+ years",
    features: "Castle build, wizard mini-figures, fantasy play",
  },
  {
    id: 38,
    quantity: 1,
    imgage: product9,
    title: "LEGO City Fire Station",
    description:
      "Save the day with the LEGO City Fire Station set—action-packed fun for everyday heroes.",
    initial_price: 1000,
    price: 750,
    delivery: "Delivery in 3–5 days",
    material: "ABS Plastic",
    size: "450+ pieces",
    age: "6+ years",
    features: "Fire trucks, rescue tower, firefighter mini-figures",
  },
  {
    id: 39,
    quantity: 1,
    imgage: product10,
    title: "LEGO Technic Sports Car",
    description:
      "Experience engineering with LEGO Technic Sports Car—realistic design and moving parts.",
    initial_price: 1400,
    price: 1100,
    delivery: "Delivery in 4–6 days",
    material: "ABS Plastic",
    size: "500+ pieces",
    age: "8+ years",
    features: "Working gears, authentic design, advanced build",
  },
  {
    id: 40,
    quantity: 1,
    imgage: product11,
    title: "LEGO Minecraft Adventures",
    description:
      "Bring Minecraft to life with LEGO—mine, craft, and explore your blocky world.",
    initial_price: 950,
    price: 700,
    delivery: "Delivery in 3–5 days",
    material: "ABS Plastic",
    size: "350+ pieces",
    age: "7+ years",
    features: "Minecraft characters, blocks, adventure play",
  },
  {
    id: 41,
    quantity: 1,
    imgage: product12,
    title: "LEGO Jurassic Dinosaur Set",
    description:
      "Enter Jurassic adventures with LEGO Dinosaur set—roar into action with prehistoric builds.",
    initial_price: 1100,
    price: 850,
    delivery: "Delivery in 5–7 days",
    material: "ABS Plastic",
    size: "420+ pieces",
    age: "8+ years",
    features: "Dinosaur builds, mini-figures, adventure play",
  },
  {
    id: 42,
    quantity: 1,
    imgage: product13,
    title: "LEGO Ninjago Dragon",
    description:
      "Master Spinjitzu with LEGO Ninjago Dragon—epic builds for ninja fans.",
    initial_price: 1200,
    price: 950,
    delivery: "Delivery in 4–6 days",
    material: "ABS Plastic",
    size: "480+ pieces",
    age: "8+ years",
    features: "Dragon build, ninja mini-figures, action play",
  },
  {
    id: 43,
    quantity: 1,
    imgage: product14,
    title: "LEGO Marvel Avengers Set",
    description:
      "Assemble your heroes with LEGO Marvel Avengers—relive action scenes with superheroes.",
    initial_price: 1300,
    price: 1000,
    delivery: "Delivery in 3–5 days",
    material: "ABS Plastic",
    size: "500+ pieces",
    age: "7+ years",
    features: "Superhero builds, iconic characters, roleplay fun",
  },
  {
    id: 44,
    quantity: 1,
    imgage: product15,
    title: "LEGO Star Wars Millennium Falcon",
    description:
      "Travel the galaxy with LEGO Millennium Falcon—iconic design from Star Wars saga.",
    initial_price: 1500,
    price: 1200,
    delivery: "Delivery in 5–7 days",
    material: "ABS Plastic",
    size: "600+ pieces",
    age: "9+ years",
    features: "Spaceship build, Star Wars mini-figures, detailed play",
  },
  {
    id: 45,
    quantity: 1,
    imgage: product16,
    title: "LEGO Architecture Eiffel Tower",
    description:
      "Build a piece of history with LEGO Eiffel Tower—perfect for display and collectors.",
    initial_price: 1600,
    price: 1300,
    delivery: "Delivery in 5–7 days",
    material: "ABS Plastic",
    size: "700+ pieces",
    age: "12+ years",
    features: "Realistic design, display piece, collectible",
  },
  {
    id: 46,
    quantity: 1,
    imgage: product17,
    title: "LEGO Creator Pirate Ship",
    description:
      "Sail the seas with LEGO Pirate Ship—embark on thrilling adventures of treasure hunting.",
    initial_price: 1400,
    price: 1100,
    delivery: "Delivery in 4–6 days",
    material: "ABS Plastic",
    size: "550+ pieces",
    age: "9+ years",
    features: "Pirate ship build, treasure play, creative design",
  },
];


  return (
    <div>
      <Header />

      <div className="container px-3 py-2">
        <BackButton className="page-back" />
      </div>

      {/* Hero section */}
      <div className="doll-section">
        <div className="doll-image">
          <img src={legoimg} alt="LEGO Set" height="600px" width="500px" />
        </div>
        <div className="doll-text">
          <h3>Explore the World of LEGO Brilliance</h3>
          <p>
            Dive into our creative range of LEGO sets that spark imagination and
            build minds. From classic brick boxes to themed adventures, each
            LEGO product promotes learning through play and hands-on fun.
            Whether your child loves space, castles, cities, or fantasy worlds,
            there's a perfect set to inspire their next masterpiece.
          </p>
        </div>
      </div>

      {/* Product cards */}
      <div className="cards">
        {menu2.map((item) => (
          <div className="card col-3" key={item.id}>
            <img
              src={item.imgage}
              className="card-img-top"
              alt={item.title}
            />
            <button
              className="wishlist-heart"
              title="Toggle wishlist"
              onClick={()=> dispatch(toggleWishlist({ ...item, name: item.title }))}
            >
              <i className={"fa-heart " + (wishlistItems.some(i=>i.id===item.id)?"fas":"far")} aria-hidden="true"></i>
            </button>
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

export default Lego;
