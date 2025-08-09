import React from 'react';
import './Lego.css';
import legoimg from '../images/lego2.webp'
import product1 from '../images/brickbox.jpg'
import product2 from '../images/princess.webp'
import product3 from '../images/space-build.webp'
import product4 from '../images/music-tour.webp'
import product5 from '../images/robo.webp'
import product6 from '../images/tiger.webp'
import product7 from '../images/cat.webp'
import product8 from '../images/harry-potter.webp'
import product9 from '../images/img28.webp'
import product10 from '../images/img20.webp'
import product11 from '../images/img21.webp'
import product12 from '../images/img22.webp'
import product13 from '../images/img23.webp'
import product14 from '../images/img24.webp'
import product15 from '../images/img25.webp'
import product16 from '../images/img26.webp'
import product17 from '../images/img27.webp'
import {useSelector,useDispatch} from 'react-redux'
import { addTocart,deleteFromCart } from '../redux/Cartslice';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Lego = () => {
    const dispatch = useDispatch();
  const cartitems = useSelector((state) => state.cart.cartitems);

  const addCart = (product) => {
    dispatch(addTocart(product));
  };

  const deleteCart = (product) => {
    dispatch(deleteFromCart(product));
  };
 const menu2 = [
  {
    id: 30,
    name: "LEGO Classic Brick Box",
    imgage: product1,
    quantity: 1,
    description: "Unleash your creativity with this LEGO Classic Brick Box—ideal for open-ended building fun for all ages.",
    initial_price: 900,
    price: 500,
  },
  {
    id: 31,
    name: "LEGO Disney Princess Castle",
    imgage: product2,
    quantity: 1,
    description: "Bring fairytales to life with the LEGO Princess Castle—perfect for fans of magic, adventure, and storytelling.",
    initial_price: 1000,
    price: 800,
  },
  {
    id: 32,
    name: "LEGO Space Explorer",
    imgage: product3,
    quantity: 1,
    description: "Blast off into fun with this LEGO Space set—design spacecrafts and start your own intergalactic mission.",
    initial_price: 800,
    price: 500,
  },
  {
    id: 33,
    name: "LEGO Friends Music Tour",
    imgage: product4,
    quantity: 1,
    description: "Join the LEGO Friends on their world tour—build instruments, stages, and play out musical dreams!",
    initial_price: 700,
    price: 500,
  },
  {
    id: 34,
    name: "LEGO Robot Inventor",
    imgage: product5,
    quantity: 1,
    description: "Build, code, and play with LEGO's Robot Inventor set—perfect for young engineers and innovators.",
    initial_price: 900,
    price: 500,
  },
  {
    id: 35,
    name: "LEGO Wild Tiger Build",
    imgage: product6,
    quantity: 1,
    description: "Bring the jungle to life with this LEGO Wild Tiger model—detailed and perfect for animal lovers.",
    initial_price: 1200,
    price: 900,
  },
  {
    id: 36,
    name: "LEGO Pet Cat Creator",
    imgage: product7,
    quantity: 1,
    description: "Build your own adorable pet cat with this LEGO Creator set—customize poses and expressions!",
    initial_price: 1000,
    price: 800,
  },
  {
    id: 37,
    name: "LEGO Harry Potter Set",
    imgage: product8,
    quantity: 1,
    description: "Step into Hogwarts with this magical LEGO Harry Potter set—perfect for wizards of all ages.",
    initial_price: 1400,
    price: 900,
  },
  {
    id: 38,
    name: "LEGO Classic Brick Box",
    imgage: product9,
    quantity: 1,
    description: "Unleash your creativity with this LEGO Classic Brick Box—ideal for open-ended building fun for all ages.",
    initial_price: 900,
    price: 500,
  },
  {
    id: 39,
    name: "LEGO Disney Princess Castle",
    imgage: product10,
    quantity: 1,
    description: "Bring fairytales to life with the LEGO Princess Castle—perfect for fans of magic, adventure, and storytelling.",
    initial_price: 1000,
    price: 800,
  },
  {
    id: 40,
    name: "LEGO Space Explorer",
    imgage: product11,
    quantity: 1,
    description: "Blast off into fun with this LEGO Space set—design spacecrafts and start your own intergalactic mission.",
    initial_price: 800,
    price: 500,
  },
  {
    id: 41,
    name: "LEGO Friends Music Tour",
    imgage: product12,
    quantity: 1,
    description: "Join the LEGO Friends on their world tour—build instruments, stages, and play out musical dreams!",
    initial_price: 700,
    price: 500,
  },
  {
    id: 42,
    name: "LEGO Robot Inventor",
    imgage: product13,
    quantity: 1,
    description: "Build, code, and play with LEGO's Robot Inventor set—perfect for young engineers and innovators.",
    initial_price: 900,
    price: 500,
  },
  {
    id: 43,
    name: "LEGO Wild Tiger Build",
    imgage: product14,
    quantity: 1,
    description: "Bring the jungle to life with this LEGO Wild Tiger model—detailed and perfect for animal lovers.",
    initial_price: 1200,
    price: 900,
  },
  {
    id: 44,
    name: "LEGO Pet Cat Creator",
    imgage: product15,
    quantity: 1,
    description: "Build your own adorable pet cat with this LEGO Creator set—customize poses and expressions!",
    initial_price: 1000,
    price: 800,
  },
  {
    id: 45,
    name: "LEGO Harry Potter Set",
    imgage: product16,
    quantity: 1,
    description: "Step into Hogwarts with this magical LEGO Harry Potter set—perfect for wizards of all ages.",
    initial_price: 1400,
    price: 900,
  },
];

  return (
    <div>
    <Header/>
      <div className="doll-section">
        <div className="doll-image">
          <img src={legoimg} alt="LEGO Set" height="600px" width="500px" />
        </div>
        <div className="doll-text">
          <h3>Explore the World of LEGO Brilliance</h3>
          <p>
            Dive into our creative range of LEGO sets that spark imagination and build minds. From classic brick boxes to themed adventures, each LEGO product promotes learning through play and hands-on fun. Whether your child loves space, castles, cities, or fantasy worlds, there's a perfect set to inspire their next masterpiece. Ideal for all ages and skill levels, LEGO turns playtime into a journey of discovery and expression!
          </p>
        </div>
      </div>

      <div className="cards">
      {menu2.map((products)=>(
   
   <div className="card col-3" style={{ width: '18rem' }} key={products.id}>
          <img src={products.imgage} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{products.name}</h5>
            <p className="card-text">{products.description}</p>
            <p className="money"><del>{products.initial_price}</del> Rs. {products.price}</p>
{
  cartitems.find(reduxdata=>reduxdata.id===products.id)?(
         
                  <button className="remove-btn"  onClick={() => deleteCart(products)}>Remove from Cart</button>
                ) : (
                  <button className="add-btn" onClick={() => addCart(products)}>Add to Cart</button>
                )}

          </div>
        </div>
   
))
}
       
      </div>

     <Footer/>
    </div>
  );
};

export default Lego;
