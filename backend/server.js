// ========= IMPORTS =========
import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import bcrypt from "bcryptjs";
import Stripe from "stripe";
import Razorpay from "razorpay";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

import voiceSearchRoutes from "./routes/voiceSearch.js";

// ========= CONFIG =========
dotenv.config();
const app = express();
const port = process.env.PORT || 6005;

// ========= MIDDLEWARE =========
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/voice", voiceSearchRoutes);

// ========= MULTER =========
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ========= PAYMENTS =========
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// ========= MONGODB =========
const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

let userCollection, ordersCollection, productsCollection;

async function run() {
  await client.connect();
  const db = client.db("test");

  userCollection = db.collection("menu");
  ordersCollection = db.collection("orders");
  productsCollection = db.collection("products");

  console.log("✅ MongoDB connected");
}
run().catch(console.error);

// ========= ROUTES =========
app.get("/", (req, res) => res.send("Server running"));

app.post("/upload", async (req, res) => {
  try {
    const { name, mail, number, password } = req.body;
    if (!name || !mail || !number || !password)
      return res.status(400).json({ message: "All fields required" });

    const existingUser = await userCollection.findOne({ mail });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const userDoc = { name, mail, number, password: hashedPassword };
    const result = await userCollection.insertOne(userDoc);

    res.status(201).json({ success: true, userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await userCollection.findOne({ mail });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    res.json({ success: true, user: { name: user.name, mail: user.mail } });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: req.body.items.map(i => ({
        price: i.priceId,
        quantity: i.quantity
      })),
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel"
    });

    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/create-razorpay-order", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: req.body.amount * 100,
      currency: "INR",
      receipt: "receipt#1"
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/upload-product", upload.single("image"), async (req, res) => {
  try {
    const imageUrl = `http://localhost:${port}/uploads/${req.file.filename}`;

    const productDoc = {
      ...req.body,
      price: Number(req.body.price),
      img: imageUrl,
      createdAt: new Date()
    };

    const result = await productsCollection.insertOne(productDoc);
    res.status(201).json({ success: true, productId: result.insertedId });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});


// ========= START SERVER =========
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
