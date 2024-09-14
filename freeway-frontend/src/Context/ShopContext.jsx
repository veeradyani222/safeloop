import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const getDefaultWishlist = () => {
  let wishlist = {};
  for (let index = 0; index < 300 + 1; index++) {
    wishlist[index] = 0;
  }
  return wishlist;
};

const ShopContextProvider = (props) => {
  const [all_products, setall_products] = useState([]);
  const [all_sliders, setall_sliders] = useState([]);
  const [all_Content, setall_Content] = useState([]);
  const [cartItems, setcartItems] = useState(getDefaultCart());
  const [wishlistItems, setwishlistItems] = useState(getDefaultWishlist());

  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setall_products(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/allsliderImages')
      .then((response) => response.json())
      .then((data) => setall_sliders(data));
  }, []);


  useEffect(() => {
    fetch('http://localhost:4000/allContent')
      .then((response) => response.json())
      .then((data) => setall_Content(data));
  }, []);


  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/getcart', {
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

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/getwishlist', {
        method: 'GET',
        headers: {
          'auth-token': `${localStorage.getItem('auth-token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setwishlistItems(data);
        });
    }
  }, []);

  const addToCart = (itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/addtocart', {
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

  const addToWishlist = (itemId) => {
    setwishlistItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/addtowishlist', {
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
      fetch('http://localhost:4000/removefromcart', {
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


  const removeFromWishlist = (itemId) => {
    setwishlistItems((prev) => {
      if (prev[itemId] && prev[itemId] > 1) {
        return { ...prev, [itemId]: prev[itemId] - 1 };
      } else {
        const updatedItems = { ...prev };
        delete updatedItems[itemId];
        return updatedItems;
      }
    });
    if (localStorage.getItem('auth-token')) {
      fetch('http://localhost:4000/removefromWishlist', {
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

  const isItemInWishlist = (itemId) => {
    return wishlistItems[itemId] > 0;
  };


  const getTotalCartCount = () => {

    const nonZeroCounts = Object.values(cartItems).filter(count => count > 0);
    
    
    if(nonZeroCounts.length>0){return nonZeroCounts.length }
    else{ return 0}
  };

  const getTotalWishlistCount = () => {

    const nonZeroCounts = Object.values(wishlistItems).filter(count => count > 0);
    
    
    if(nonZeroCounts.length>0){return nonZeroCounts.length }
    else{ return 0}
  };
  


  const contextValue = { all_products, all_sliders ,all_Content ,cartItems, wishlistItems, addToCart, addToWishlist , removeFromCart,removeFromWishlist ,  isItemInCart, isItemInWishlist, getTotalCartCount , getTotalWishlistCount};

  return <ShopContext.Provider value={contextValue}>
    {props.children}
  </ShopContext.Provider>
}

export default ShopContextProvider;
