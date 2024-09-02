import React, { useContext } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart, isItemInCart } = useContext(ShopContext);

  const buttonText = isItemInCart(product.id) ? 'Added!' : 'Add to Cart';

  return (
    <div className="product-display">
      <div className="image-gallery">
        <div className="thumbnail-images">
          <img src={product.image} alt="Product Image 1" className="thumbnail-image" />
          <img src={product.image} alt="Product Image 2" className="thumbnail-image" />
          <img src={product.image} alt="Product Image 3" className="thumbnail-image" />
        </div>
        <div className="main-image">
          <img src={product.image} alt="Main Product Image" className="main-product-image" />
        </div>
      </div>

      <div className="product-details">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-description">{product.description}</p>
        <div className="price-section">
          <span className="new-price">${product.new_price}</span>
          <span className="old-price">${product.old_price}</span>
        </div>
        <button onClick={() => addToCart(product.id)} className="add-to-cart-button">
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;
