import React, { useContext , useState} from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom'; 
import cart_icon from '../assets/cart_icon.png';
import logo from '../assets/logo.png';
import { ShopContext } from '../../Context/ShopContext'; // Import ShopContext

const Navbar = () => {
  const [menu, setmenu] = useState("shop");
  const { getTotalCartCount } = useContext(ShopContext); // Use the context

  const totalCartItems = getTotalCartCount();

  return (
    <div>
      <nav>
     <center>   <div className="logo">
          <img className='logo-img' src={logo} alt="not found" />
        </div></center>
        <div className="nav-content">
          <li onClick={() => { setmenu("shop") }}> 
            <Link to="/">shop</Link> 
            {menu === "shop" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setmenu("men") }}> 
            <Link to="/mens">men</Link> 
            {menu === "men" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setmenu("women") }}> 
            <Link to="/womens">women</Link>  
            {menu === "women" ? <hr /> : <></>}
          </li>
          <li onClick={() => { setmenu("kids") }}> 
            <Link to="/kids">kids</Link> 
            {menu === "kids" ? <hr /> : <></>}
          </li>
        </div>
        <div className="login-profile">
          {localStorage.getItem('auth-token')? 
            <li className='login' onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/') }}>LogOut</li>
          :  
            <Link to="/login">
              <li className='login'>Login</li>
            </Link>
          }
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
