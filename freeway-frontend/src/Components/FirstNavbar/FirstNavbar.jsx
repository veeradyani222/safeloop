import React, { useState } from 'react';
import './FirstNavbar.css';
import { Link, useNavigate } from 'react-router-dom';
import cart_icon from '../assets/cart_icon.png';
import user_icon from '../assets/profile-new.png';
import logo from '../assets/logo.png';

const FirstNavbar = () => {
    const navigate = useNavigate();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('auth-token');
        setIsLogoutModalOpen(false);
        navigate('/');
    };

    const checkAuthentication = (route) => {
        if (!localStorage.getItem('auth-token')) {
            navigate('/login');
        } else {
            navigate(route);
        }
    };

    return (
        <div className='firstnav'>
            <nav>
                {/* Logo */}
                <div className="logo" onClick={() => navigate('/')}>
                    <img className='logo-img' src={logo} alt="Logo" />
                </div>

                {/* Search Input */}
                <div className="search-bar-first">
                    <input
                        type="text"
                        placeholder="Search products by name, subject, faculty..."
                        className="search-input-first"
                    />
                </div>

                {/* Profile, Wishlist, and Cart Icons */}
                <div className="login-profile">
                    {localStorage.getItem('auth-token') ? (
                        <li className='login' onClick={() => setIsLogoutModalOpen(true)}>Logout</li>
                    ) : (
                        <Link to="/login">
                            <li className='login'>Login</li>
                        </Link>
                    )}
                    <div className="cart profile" onClick={() => checkAuthentication('/profile')}>
                        <li className='profile'>
                            <img src={user_icon} alt="Profile" />
                        </li>
                    </div>
                    <div className="cart shopcart" onClick={() => checkAuthentication('/cart')}>
                        <div className="cart-cart-number">0</div>
                        <li className='cart shopcart'>
                            <img src={cart_icon} alt="Cart" />
                        </li>
                    </div>
                </div>
            </nav>

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
        </div>
    );
};

export default FirstNavbar;