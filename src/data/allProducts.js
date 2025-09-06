// src/data/allProducts.js
import card1 from '../images/teddy.webp'
import card2 from '../images/unicorn.webp'
import card3 from '../images/girl.webp'
import card4 from '../images/teddy1.webp'
import card5 from '../images/dog.webp'
import card6 from '../images/teddy3.webp'
import card7 from '../images/lion.webp'
import card8 from '../images/dragon.webp'
import card9 from '../images/img1.webp'
import card10 from '../images/img2.webp'
import card11 from '../images/img3.webp'
import card12 from '../images/img17.webp'
import card13 from '../images/img5.webp'
import card14 from '../images/img6.webp'
import card15 from '../images/img7.webp'
import card16 from '../images/img8.jpg'
import card17 from '../images/img16.webp'
import card18 from '../images/img9.webp'
import card19 from '../images/img10.webp'
import card20 from '../images/img11.webp'
import card21 from '../images/img12.webp'
import card22 from '../images/img13.webp'
import card23 from '../images/img14.webp'
import card24 from '../images/img15.webp'

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

const allProducts = [
  {
    id: 1,
    quantity: 1,
    imgage: card1,
    name: "Brown Bear",
    description: "Large soft brown teddy bear perfect for hugging and bedtime comfort.",
    initial_price: 900,
    priceId: "price_12345abcXYZ",
    price: 500,
  },
  {
    id: 2,
    quantity: 1,
    imgage: card2,
    name: "Unicorn",
    description: "Magical red unicorn soft toy with sparkling details for fantasy play",
    initial_price: 900,
    price: 500,
  },
  {
    id: 3,
    quantity: 1,
    imgage: card3,
    name: "Cute Girl Doll",
    description: "Adorable plush doll with cute outfit, perfect for storytelling fun.",
    initial_price: 800,
    price: 500,
  },
  {
    id: 4,
    quantity: 1,
    imgage: card4,
    name: "Hug Bear",
    description: "Large soft brown teddy bear perfect for hugging and bedtime comfort.",
    initial_price: 800,
    price: 500,
  },
  {
    id: 5,
    quantity: 1,
    imgage: card5,
    name: "Plush Puppy",
    description: "Soft and friendly puppy plush toy for animal lovers of all ages.",
    initial_price: 750,
    price: 500,
  },
  {
    id: 6,
    quantity: 1,
    imgage: card6,
    name: "Cuddle Cub",
    description: "Soft cub teddy designed for maximum cuddle comfort during naps.",
    initial_price: 750,
    price: 500,
  },
  {
    id: 7,
    quantity: 1,
    imgage: card7,
    name: "Lion Buddy",
    description: "Large soft lion plush with a fluffy mane, perfect for jungle adventures.",
    initial_price: 750,
    price: 500,
  },
  {
    id: 8,
    quantity: 1,
    imgage: card8,
    name: "Dragon Plush",
    description: "Soft dragon plush with wings and tail, perfect for mythical playtime.",
    initial_price: 800,
    price: 500,
  },
  {
    id: 9,
    quantity: 1,
    imgage: card9,
    name: "Giraffe Plush",
    description: "Play Hour Ring Giraffe Plush Soft Toy for Ages 3 Years and Up, Green, 45cm",
    initial_price: 950,
    price: 700,
  },
  {
    id: 10,
    quantity: 1,
    imgage: card10,
    name: "Panda Pal",
    description: "Play Hour Giant Bamboo Panda Plush Soft Toy for Ages 3 Years and Up - Grey, 55cm",
    initial_price: 1100,
    price: 800,
  },
  {
    id: 11,
    quantity: 1,
    imgage: card11,
    name: "Fashion Girl",
    description: "Adorable plush doll with cute outfit, perfect for storytelling fun.",
    initial_price: 800,
    price: 500,
  },
  {
    id: 12,
    quantity: 1,
    imgage: card12,
    name: "Hoodie Duck",
    description: "Play Hour Hoodie Duck Plush Soft Toy for Ages 3 Years and Up - Grey, 25cm",
    initial_price: 1000,
    price: 900,
  },
  {
    id: 13,
    quantity: 1,
    imgage: card13,
    name: "Masha Bear",
    description: "Simba Masha and The Bear 40cm Plush Soft Teddy Bear for Kids",
    initial_price: 1000,
    price: 800,
  },
  {
    id: 14,
    quantity: 1,
    imgage: card14,
    name: "Royal Elephant",
    description: "Elephant Plush Soft Toy with Crown for Ages 3 Years and Up - 45cm",
    initial_price: 1100,
    price: 900,
  },
  {
    id: 15,
    quantity: 1,
    imgage: card15,
    name: "Pink Dress Doll",
    description: "Winky Rag Doll Plush Soft Toy Wearing Pink Dress for Ages 3 Years and Up",
    initial_price: 1000,
    price: 850,
  },
  {
    id: 16,
    quantity: 1,
    imgage: card16,
    name: "Knitted Doll",
    description: "Clapjoy Soft Hand Knitted Cotton Thread Doll For Kids",
    initial_price: 950,
    price: 700,
  },

  // ✅ LEGO PRODUCTS
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

export default allProducts;
    