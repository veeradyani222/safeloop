
import './App.css';
import Navbar from './Components/navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory.jsx';
import Cart from './Pages/Cart.jsx';
import Product from './Pages/Product.jsx';
import Home from './Pages/Home.jsx';
import LoginSignup from './Pages/LoginSignup.jsx';
import Footer from './Components/Footer/Footer.jsx';
import all_products from './Components/assets/all_products.js';
import About from './Pages/About.jsx';
import Categories from './Pages/Categories.jsx';
import ContactUs from './Pages/ContactUs.jsx';
import Courses from './Pages/Courses.jsx';
import OfflineOrders from './Pages/OfflineOrders.jsx';
import FAQ from './Pages/FAQ.jsx';
import Terms from './Pages/Terms.jsx';
import Wishlist from './Pages/Wishlist.jsx';

function App() {

  console.log(all_products)
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Categories/CA-Final" element={<ShopCategory  category="CA Final" />} />
          <Route path="/Categories/CA-Inter" element={<ShopCategory  category="CA Inter" />} />
          <Route path="/Categories/CMA-Courses" element={<ShopCategory  category="CMA Courses" />} />
          <Route path="/Categories/CS-Courses" element={<ShopCategory  category="CS Courses" />} />
          <Route path="/About" element={<About/>} />
          <Route path="/Categories" element={<Categories/>} />
          <Route path="/ContactUs" element={<ContactUs/>} />
          <Route path="/Courses" element={<Courses/>} />
          <Route path="/FAQ" element={<FAQ/>} />
          <Route path="/Terms" element={<Terms/>} />
          <Route path="/OfflineOrders" element={<OfflineOrders/>} />
          <Route path="/product/:productId" element={<Product/>} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
