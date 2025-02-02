import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = () => {
  const { id } = useParams();
  const { allincidents } = useContext(ShopContext);

  if (!allincidents) {
    return <p>Loading incidents...</p>; // Or any other loading message or component
  }

  const product = allincidents.find(p => p.id === parseInt(id));

  if (!product) {
    return <p>Incident not found</p>;
  }

  return (
    <div className="product-display">
      <div className="image-gallery">
        <div className="main-image">
          <img src={product.image} alt="Main Product Image" className="main-product-image" />
        </div>
      </div>

      <div className="product-details">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-description">{product.description}</p>
      
      </div>
    </div>
  );
};

export default ProductDisplay;
