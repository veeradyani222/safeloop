
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
import FAQ from './Pages/FAQ.jsx';
import Wishlist from './Pages/Wishlist.jsx';
import PostIssue from './Components/PostIssue/PostIssue.jsx';
import Incidents from './Pages/Incidents.jsx';
import ProductDisplay from './Components/ProductDispay/ProductDisplay.jsx';

function App() {

  console.log(all_products)
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Incidents/Harassment" element={<ShopCategory category="Harassment" />} />
          <Route path="/Incidents/Discrimination" element={<ShopCategory category="Discrimination" />} />
          <Route path="/Incidents/Workplace-Safety" element={<ShopCategory category="Workplace Safety" />} />
          <Route path="/Incidents/Fraud-Misconduct" element={<ShopCategory category="Fraud & Misconduct" />} />
           <Route path="/Incidents/Environmental-Issues" element={<ShopCategory category="Environmental Issues" />} />
          <Route path="/Incidents/Customer-Service" element={<ShopCategory category="Customer Service" />} />
          <Route path="/Incidents/Legal-Compliance" element={<ShopCategory category="Legal & Compliance" />} />
          <Route path="/Incidents/Operational-Failures" element={<ShopCategory category="Operational Failures" />} />
          <Route path="/About" element={<About/>} />
          <Route path="/Categories" element={<Categories/>} />
          <Route path="/ContactUs" element={<ContactUs/>} />
          <Route path="/Incidents" element={<Incidents/>} />
          <Route path="/FAQ" element={<FAQ/>} />
          <Route path="/Raise-an-Issue" element={<PostIssue/>} />
          <Route path="/product/:productId" element={<Product/>} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDisplay />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
