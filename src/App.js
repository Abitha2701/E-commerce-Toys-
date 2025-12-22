import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Aboutus from './pages/Aboutus';
import Contact from './pages/Contact';
import Softtoys from './pages/Softtoys';
import Lego from './pages/Lego';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from './pages/Register';
import Login from './pages/Login';
import ForgetPassword from './pages/ForgetPassword';
import Profile from './pages/Profile';
import Cartpage from './pages/Cartpage';
import '@fortawesome/fontawesome-free/css/all.min.css';
import  SearchResults  from './pages/SearchResults';
import ProductDetails from "./pages/ProductDetails";
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import OrderSummary from './pages/OrderSummary';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import { ClerkProvider } from '@clerk/clerk-react';

// Import your publishable key
const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/search" element={<SearchResults />} />
            <Route path='' element={<Home/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/about' element={<Aboutus/>}/>
            <Route path='/softtoys' element={<Softtoys/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/forgetpassword' element={<ForgetPassword/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/cart' element={<Cartpage/>}/>
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/order/:orderId" element={<OrderSummary />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </ClerkProvider>
  );
}

export default App;
