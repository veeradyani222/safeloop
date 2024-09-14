import React, { useContext , useState} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; 
import cart_icon from '../assets/cart_icon.png';
import logo from '../assets/logo.png';
import { ShopContext } from '../../Context/ShopContext'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [menu, setmenu] = useState("Home");
  const { getTotalCartCount ,  getTotalWishlistCount } = useContext(ShopContext); 
  const totalCartItems = getTotalCartCount();
  const totalWishlistItems =  getTotalWishlistCount();

  return (
    <div>
      <nav>
        <center> 
        <div className="logo">
          <img className='logo-img' src={logo} alt="not found" />
        </div>
        </center>
        <div className="nav-content">
        <li 
        onClick={() => { setmenu("Home") }} 
        className={menu === "Home" ? "highlighted" : ""}
    >
        <Link to="/">Home</Link>
    </li>
    <li 
        onClick={() => { setmenu("AboutUs") }} 
        className={menu === "AboutUs" ? "highlighted" : ""}
    >
        <Link to="/About">About Us</Link>
    </li>
    <li 
        onClick={() => { setmenu("Courses") }} 
        className={menu === "Courses" ? "highlighted" : ""}
    >
        <Link to="/Courses">Courses</Link>
    </li>
    <li 
        onClick={() => { setmenu("Categories") }} 
        className={menu === "Categories" ? "highlighted" : ""}
    >
        <Link to="/Categories">Categories</Link>
    </li>
    <li 
        onClick={() => { setmenu("Terms of Use") }} 
        className={menu === "Terms of Use" ? "highlighted" : ""}
    >
        <Link to="/Terms">Terms of Use</Link>
    </li>
    <li 
        onClick={() => { setmenu("FAQ") }} 
        className={menu === "FAQ" ? "highlighted" : ""}
    >
        <Link to="/FAQ">FAQ</Link>
    </li>
    <li 
        onClick={() => { setmenu("Contact Us") }} 
        className={menu === "Contact Us" ? "highlighted" : ""}
    >
        <Link to="/ContactUs">Contact Us</Link>
    </li>
    <li 
        onClick={() => { setmenu("Offline Orders") }} 
        className={menu === "Offline Orders" ? "highlighted" : ""}
    >
        <Link to="/OfflineOrders">Offline Orders</Link>
    </li>
</div>
<div className="login-profile">
    {localStorage.getItem('auth-token') ? 
        <li className='login' onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/') }}>LogOut</li>
    :  
        <Link to="/login">
            <li className='login'>Login</li>
        </Link>
    }

<Link to="/wishlist">
            <div className="cart">
              <div className="cart-number">{totalWishlistItems}</div>
              <li className='wishlist'>
              <FontAwesomeIcon
                icon={faHeart}
              />
              </li> 
            </div>
          </Link>

          <Link to="/cart">
            <div className="cart">
              <div className="cart-number">{totalCartItems}</div>
              <li className='cart'>
                <img src={cart_icon} alt="" />
              </li> 
            </div>
          </Link>
        </div>
      </nav>

      
    </div>
  );
};

export default Navbar;
