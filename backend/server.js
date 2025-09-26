const express = require("express");
const cors = require("cors");
const app = express();

const port = 6005;
const bcrypt = require("bcryptjs");
const Stripe = require("stripe");
const stripe = new Stripe("sk_test_51S0iteCkxII7b1vsRONIfkZkxIFiPih5GV5V7R9zQd9rQ3jkwT3NkSpYmYF0p4PCEVmGblUxmUP8n6Z9AdUpVpkt00BAVi4e7F"); // 🔑 your secret key
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_RIxcFGVUeZMOtv",     // ✅ your Razorpay Test Key ID
  key_secret: "8O18HiVok7rlBYRfefrYYiW8" // ✅ your Razorpay Test Key Secret
});


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hi");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const uri = "mongodb+srv://abitha27012005:Abitha27@cluster0.mklctlg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let userCollection;
let ordersCollection;
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db=client.db("test");
     userCollection=db.collection("menu");
     ordersCollection = db.collection("orders");

    app.post("/upload",async(req,res)=>{
        try{
            const {name,mail,number,password}=req.body;
            console.log(name,mail,number,password,"inside upload")
            if(!name || !mail || !number || !password){
                return res.status(400).json({success:false,message:"all fields are required"});
            }
            const existingUser=await userCollection.findOne({mail});
            if(existingUser){
                return res.status(409).json({success:false,message:"User already exist"});
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const result=await userCollection.insertOne({
            name,
            mail,
            number,
            password:hashedPassword
        });
        res.status(201).json({success:true,message:"User registere" ,userId:result.insertedId});
    }
   catch(error){
    console.log("Error in /upload:",error);
    res.status(500).json({success:false,message:"Servor error"});
   }
    });
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

 app.post("/login", async (req, res) => {
        try {
             
          const { mail, password } = req.body;
          if (!mail || !password) {
            return res.status(400).json({ success: false, message: "Email and password required" });
          }

          const user = await userCollection.findOne({ mail });
          if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
          }

          res.status(200).json({ success: true, message: "Login successful", user: { name: user.name, mail: user.mail,_id:user._id } });

        } catch (error) {
          console.error("Error in /login:", error);
          res.status(500).json({ success: false, message: "Server error" });
        }
      });
app.put("/reset-password",async(req,res)=>{
const {mail,newPassword}=req.body;

if(!mail || !newPassword){
  return res.status(400).json({message:"Email and new password required"});
}
  const hashedPassword=await bcrypt.hash(newPassword,10);

  await userCollection.updateOne(
    {mail},
    {$set:{password: hashedPassword}}
  );
  res.json({message:"Password reset successful"});
}
)

app.get("/profile/:mail", async (req, res) => {
  const { mail } = req.params;
console.log("Fetching profile for:", mail); 
  try {
    const user = await userCollection.findOne(
      { mail },
      { projection: { password: 0 } }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error in /user/:mail:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { items } = req.body;
    console.log("Items from frontend:", items);

    const lineItems = items.map(item => ({
      price: item.priceId,   // ✅ use priceId directly
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment", // ✅ only works if price is one-time
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Orders API
// Create a new order
app.post("/orders", async (req, res) => {
  try {
    const {
      mail,
      customerName,
      shippingAddress,
      items,
      totalAmount,
      paymentMethod,
      status = "Pending",
      notes = "",
    } = req.body;

    if (!mail || !customerName || !shippingAddress || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, message: "Missing required order fields" });
    }

    const orderDoc = {
      mail,
      customerName,
      shippingAddress,
      items: items.map(i => ({
        id: i.id,
        name: i.name,
        quantity: Number(i.quantity) || 1,
        price: Number(i.price) || 0,
        img: i.img || i.imgage || null,
      })),
      totalAmount: Number(totalAmount) || 0,
      paymentMethod: paymentMethod || "",
      status,
      createdAt: new Date(),
      notes,
    };

    const result = await ordersCollection.insertOne(orderDoc);
    return res.status(201).json({ success: true, orderId: result.insertedId, order: { _id: result.insertedId, ...orderDoc } });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get orders for a user by mail
app.get("/orders", async (req, res) => {
  try {
    const { mail } = req.query;
    if (!mail) return res.status(400).json({ success: false, message: "mail is required" });
    const orders = await ordersCollection.find({ mail }).sort({ createdAt: -1 }).toArray();
    res.json({ success: true, orders });
  } catch (err) {
    console.error("List orders error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get single order by id
app.get("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let _id;
    try {
      _id = new ObjectId(id);
    } catch (e) {
      return res.status(400).json({ success: false, message: "Invalid order id" });
    }
    const order = await ordersCollection.findOne({ _id });
    if (!order) return res.status(404).json({ success: false, message: "Order not found" });
    res.json({ success: true, order });
  } catch (err) {
    console.error("Get order error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/create-razorpay-order", async (req, res) => {
  try {
    const { amount } = req.body; // amount in INR

    const options = {
      amount: amount * 100, // amount in paise (so 100 INR = 10000)
      currency: "INR",
      receipt: "receipt#1"
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Razorpay error:", err);
    res.status(500).json({ error: err.message });
  }
});
