import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../assets/cart_cross_icon.png';
import Confetti from 'react-confetti';

const CartItems = () => {
    const { all_products, cartItems, removeFromCart } = useContext(ShopContext);
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const handleApplyCoupon = () => {
        // Apply a simple coupon logic
        if (coupon === '11VEER11') {
            setDiscount(0.1); // 10% discount
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 4000); // Stop confetti after 3 seconds
        } 
        else {
            alert('Invalid coupon code');
            setDiscount(0);
        }
    };

    const calculateTotal = () => {
        let total = 0;
        all_products.forEach(e => {
            if (cartItems[e.id] > 0) {
                total += e.new_price * cartItems[e.id];
            }
        });
        return total * (1 - discount); // Apply discount if any
    };

    return (
        <div className='cart-items'>
            {showConfetti && <Confetti />}
            <div className="cartitems-container">
                <div className="cartitems-main-format">
                    <p>Products</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr />
                {all_products.map((e) => {
                    if (cartItems[e.id] > 0) {
                        return (
                            <div key={e.id}>
                                <div className="cartitems-format">
                                    <img src={e.image} alt={e.name} className="carticon-product-icon" />
                                    <p className="item-name">{e.name}</p>
                                    <p className="product-price">${e.new_price.toFixed(2)}</p>
                                    <button className="cartitems-quantity">{cartItems[e.id]}</button>
                                    <p className="cartitems-price">${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                                    <img onClick={() => { removeFromCart(e.id) }} src={remove_icon} alt="remove product" className="remove-cartitems" />
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
                <hr />
                <div className="coupon-section">
                    <input 
                        type="text" 
                        placeholder="Enter coupon code" 
                        value={coupon} 
                        onChange={(e) => setCoupon(e.target.value)} 
                        className="coupon-input"
                    />
                    <button onClick={handleApplyCoupon} className="apply-coupon-button">Apply Coupon</button>
                </div>
                <div className="cart-total">
                    <p>Total: ${calculateTotal().toFixed(2)}</p>
                    <button className="buy-button">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default CartItems;
