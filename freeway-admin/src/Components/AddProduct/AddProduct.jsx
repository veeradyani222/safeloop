import React, { useState } from 'react';
import './AddProduct.css';
import upload_image from '../assets/upload_image.png';

const AddProduct = () => {
  const [image, setImage] = useState(null); 
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    description: "",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    setProductDetails({ ...productDetails, image: e.target.files[0] }); 
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault(); 
    console.log(productDetails);

    let product = { ...productDetails };
    let responseData = {};

    // Upload image
    let formData = new FormData();
    formData.append('product', image);

    try {
      const imageResponse = await fetch('https://f-way.onrender.com/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: formData,
      });
      responseData = await imageResponse.json();

      if (responseData.success) {
        product.image = responseData.image_url;
      } else {
        alert("Failed to upload image");
        return;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image");
      return;
    }

    // Add product
    try {
      const productResponse = await fetch('https://f-way.onrender.com/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      });
      const result = await productResponse.json();
      if (result.success) {
        alert("Product Added!");
      } else {
        alert("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product");
    }
  };

  return (
    <div className="add-product-container">
      <h1 className="heading">Fill the Below Fields</h1>
      <form className="add-product-form" onSubmit={addProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="input-field"
          value={productDetails.name}
          onChange={changeHandler}
        />
        <textarea
          name="description"
          placeholder="Description"
          className="input-field description-field"
          value={productDetails.description}
          onChange={changeHandler}
        />
        <label htmlFor="product-image" className="custom-file-upload">
          <img src={image ? URL.createObjectURL(image) : upload_image} alt="" />
        </label>
        <input
          type="file"
          id="product-image"
          accept="image/*"
          className="input-field file-input"
          name="image"
          onChange={imageHandler}
        />
        <input
          type="number"
          name="old_price"
          placeholder="Price"
          className="input-field"
          value={productDetails.old_price}
          onChange={changeHandler}
        />
        <input
          type="number"
          name="new_price"
          placeholder="Offer Price"
          className="input-field"
          value={productDetails.new_price}
          onChange={changeHandler}
        />
        <select
          name="category"
          className="input-field category-field"
          value={productDetails.category}
          onChange={changeHandler}
        >
          <option value="" disabled>Select Category</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="kid">Kids</option>
        </select>
        <button type="submit" className="submit-button">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
