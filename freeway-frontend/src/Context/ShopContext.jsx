import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_products, setall_products] = useState([]);
  const [cartItems, setcartItems] = useState(getDefaultCart());

  useEffect(() => {
    fetch('https://f-way.onrender.com/allproducts')
      .then((response) => response.json())
      .then((data) => setall_products(data));
  }, []);

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      fetch('https://f-way.onrender.com/getcart', {
        method: 'GET',
        headers: {
          'auth-token': `${localStorage.getItem('auth-token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setcartItems(data);
        });
    }
  }, []);

  const addToCart = (itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (localStorage.getItem('auth-token')) {
      fetch('https://f-way.onrender.com/addtocart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setcartItems((prev) => {
      if (prev[itemId] && prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const updatedItems = { ...prev };
        delete updatedItems[itemId];
        return updatedItems;
      }
    });
    if (localStorage.getItem('auth-token')) {
      fetch('https://f-way.onrender.com/removefromcart', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'auth-token': `${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  // New function to check if an item is in the cart
  const isItemInCart = (itemId) => {
    return cartItems[itemId] > 0;
  };

  const getTotalCartCount = () => {
    const nonZeroCounts = Object.values(cartItems).filter(count => count > 0);
    return nonZeroCounts.length > 0 ? nonZeroCounts.length : 0;
  };

  const contextValue = { all_products, cartItems, addToCart, removeFromCart, isItemInCart, getTotalCartCount };

  return <ShopContext.Provider value={contextValue}>
    {props.children}
  </ShopContext.Provider>
}

export default ShopContextProvider;
