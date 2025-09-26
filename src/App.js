
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



function App() {
  return (
    
    <div className="App">
    <BrowserRouter>
    
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

      </Routes>
   
      </BrowserRouter>
    </div>
  );
}

export default App;
