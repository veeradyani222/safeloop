import React, { useContext, useState, useRef, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import user_icon from '../assets/profile-new.png';
import logo from '../assets/logo.png';
import { FaBars, FaTimes} from 'react-icons/fa';

const Navbar = () => {
  const [menu, setMenu] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  const [isPolicyDropdownOpen, setIsPolicyDropdownOpen] = useState(false);


  const navigate = useNavigate();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleHelpDropdown = () => {
    setIsHelpDropdownOpen(!isHelpDropdownOpen);
  };
  const togglePolicyDropdown = () => {
    setIsPolicyDropdownOpen(!isPolicyDropdownOpen);
  };


  const checkAuthentication = (route) => {
    if (!localStorage.getItem('auth-token')) {
      navigate('/login');
    } else {
      navigate(route);
    }
  };

  const handleHelpLinkClick = (route) => {
    setIsHelpDropdownOpen(false);
    navigate(route);
  };

  // Close the menu when a menu item is clicked
  const handleMenuClick = (route) => {
    toggleMenu(); // Close the menu
    navigate(route); // Navigate to the selected route
  };

  

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    setIsLogoutModalOpen(false);
    navigate('/');
  };

  return (
    <div className='main-nav'>
      {/* Logout Confirmation Modal */}
       {isLogoutModalOpen && (
        <div className="logout-modal">
          <div className="logout-modal-content">
            <h3>Are you sure you want to log out?</h3>
            <button onClick={handleLogout}>Yes, Log Out</button>
            <button onClick={() => setIsLogoutModalOpen(false)}>Cancel</button>
          </div>
        </div>
      )} 

      <nav>
        <div className="nav-left">
          <div className="hamburger-menu" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </div>


        </div>

<div className={`nav-content ${isMenuOpen ? 'show-menu' : ''}`}>
  <li className={menu === 'Home' ? 'highlighted' : 'normal-nav'} onClick={() => { setMenu('Home'); handleMenuClick('/'); }}>
    <Link to="/">Home</Link>
  </li>
  <li className={menu === 'About' ? 'highlighted' : 'normal-nav'} onClick={() => { setMenu('About'); handleMenuClick('/About'); }}>
    <Link to="/About">About Us</Link>
  </li>
  <li className={menu === 'Courses' ? 'highlighted' : 'normal-nav'} onClick={() => { setMenu('Courses'); handleMenuClick('/Courses'); }}>
    <Link to="/Courses">Courses</Link>
  </li>
  
  <li className={menu === 'Categories' ? 'highlighted' : 'normal-nav'} onClick={() => { setMenu('Categories'); handleMenuClick('/Categories'); }}>
    <Link to="/Categories">Categories</Link>
  </li>
  <li onClick={toggleHelpDropdown} className='normal-nav'>
    Help
    <ul className={`dropdown ${isHelpDropdownOpen ? 'show-dropdown' : ''}`}>
      <li className={menu === 'ContactUs' ? 'highlighted' : 'normal-nav1'} onClick={() => { setMenu('ContactUs'); handleHelpLinkClick('/ContactUs'); }}>
        <Link to="/ContactUs">Contact Us</Link>
      </li>
      <li className={menu === 'FAQ' ? 'highlighted' : 'normal-nav1'} onClick={() => { setMenu('FAQ'); handleHelpLinkClick('/FAQ'); }}>
        <Link to="/FAQ">FAQ</Link>
      </li>
      <li className={menu === 'Support' ? 'highlighted' : 'normal-nav1'} onClick={() => { setMenu('Support'); handleHelpLinkClick('/query'); }}>
        <Link to="/query">Support</Link>
      </li>
    </ul>
  </li>
  <li onClick={togglePolicyDropdown} className='normal-nav'>
   Our Policies
    <ul className={`dropdown ${isPolicyDropdownOpen ? 'show-dropdown' : ''}`}>
      <li className={menu === 'Terms' ? 'highlighted' : 'normal-nav1'} onClick={() => { setMenu('Terms'); handleHelpLinkClick('/Terms'); }}>
        <Link to="/Terms">Terms of Use</Link>
      </li>
      <li className={menu === 'PrivacyPolicy' ? 'highlighted' : 'normal-nav1'} onClick={() => { setMenu('PrivacyPolicy'); handleHelpLinkClick('/PrivacyPolicy'); }}>
        <Link to="/PrivacyPolicy">Privacy Policy</Link>
      </li>
      <li className={menu === 'RefundPolicy' ? 'highlighted' : 'normal-nav1'} onClick={() => { setMenu('RefundPolicy'); handleHelpLinkClick('/RefundPolicy'); }}>
        <Link to="/RefundPolicy">Refund Policy</Link>
      </li>
      <li className={menu === 'ExchangePolicy' ? 'highlighted' : 'normal-nav1'} onClick={() => { setMenu('ExchangePolicy'); handleHelpLinkClick('/ExchangePolicy'); }}>
        <Link to="/ExchangePolicy">Exchange Policy</Link>
      </li>
    </ul>
  </li>
  <li className={menu === 'GiveAReview' ? 'highlighted' : 'normal-nav'} onClick={() => { setMenu('GiveAReview'); handleMenuClick('/GiveAReview'); }}>
    <Link to="/GiveAReview">Give A Review</Link>
  </li>
  <li className={menu === 'OfflineOrders' ? 'highlighted' : 'normal-nav'} onClick={() => { setMenu('OfflineOrders'); handleMenuClick('/OfflineOrders'); }}>
    <Link to="/OfflineOrders">Offline Orders</Link>
  </li>
  <li className={menu === 'blog' ? 'highlighted' : 'normal-nav'} onClick={() => { setMenu('blog'); handleMenuClick('/blog'); }}>
    <Link to="/blog">Blog</Link>
  </li>
  <li className={menu === 'faculties' ? 'highlighted' : 'normal-nav'} onClick={() => { setMenu('faculties'); handleMenuClick('/faculties'); }}>
    <Link to="/blog">Faculties</Link>
  </li>
</div>
      </nav>


      <div
  className="mobile-login-profile-1"
  style={{
    display: "flex",
    flexDirection: "column",
  }}
>


  {/* Logo */}
  <div className="mobile-login-profile">

  <div className="something">
    <div className="logo" onClick={() => navigate('/')}>
      <img className="logo-img" src={logo} alt="Logo" />
    </div>
  </div>

  {/* Authentication Options */}
  {localStorage.getItem('auth-token') ? (
    <li className="login" onClick={() => setIsLogoutModalOpen(true)}>Logout</li>
  ) : (
    <Link to="/login">
      <li className="login">Login</li>
    </Link>
  )}

  {/* Profile Section */}
  <div className="cart profile" onClick={() => checkAuthentication('/profile')}>
    <li className="profile">
      <img src={user_icon} alt="User" />
    </li>
  </div>




  </div>
  {/* Search Bar (conditionally displayed) */}

</div>
  
</div>


    
  );
};

export default Navbar;