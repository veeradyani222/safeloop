import React, { useContext } from 'react';
import './WishlistItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../assets/cart_cross_icon.png';

const WishlistItems = () => {
    
    const { all_products, wishlistItems, removeFromWishlist } = useContext(ShopContext);

    return (
        <div className='cart-items'>
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
                    if (wishlistItems[e.id] > 0) {
                        return (
                            <div key={e.id}>
                                <div className="cartitems-format">
                                    <img src={e.image} alt={e.name} className="carticon-product-icon" />
                                    <p className="item-name">{e.name}</p>
                                    <p className="product-price">${e.new_price.toFixed(2)}</p>
                                    <button className="cartitems-quantity">{wishlistItems[e.id]}</button>
                                    <p className="cartitems-price">${(e.new_price * wishlistItems[e.id]).toFixed(2)}</p>
                                    <img onClick={() => { removeFromWishlist(e.id) }} src={remove_icon} alt="remove product" className="remove-cartitems" />
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
                <hr />
            </div>
        </div>
    );
};

export default WishlistItems;
