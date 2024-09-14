import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../assets/cart_cross_icon.png'

const ListProduct = () => {
  const [allproducts, setallproducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allproducts')
      .then((res) => res.json())
      .then((data) => {
        setallproducts(data);
      });
  }

  useEffect(() => {
    fetchInfo()
  }, []);

  const handleRemove = async (id) => {
              await fetch('http://localhost:4000/removeproduct',{
                method: 'POST',
                headers:{
                  Accept:'application/json',
                  'Content-type': 'application/json',
                },
                body:JSON.stringify({id:id})
              })
              await fetchInfo();
  }

  return (
    <div className='list-product'>
      <div className="list-product-head">
        <p>Product name</p>
        <p>id</p>
        <p>Image</p>
        <p>Lecturer</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Sub-category</p>
        <p>Batch Starts</p>
        <p>Batch Ends</p>
        <p>Remove</p>
      </div>
      <div className="list-product-main">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <div key={index} className="list-product-format-main list-product-format">
              <p>{product.name}</p>
              <p>{product.id}</p>
              <img src={product.image} alt="not found" />
              <p>{product.lecturer}</p>
              <p>₹{product.old_price}</p>
              <p>₹{product.new_price}</p>
              <p>{product.category}</p> 
              <p>{product.sub_category}</p> 
              <p>{new Date(product.batch_start).toLocaleDateString('en-GB')}</p>
              <p>{new Date(product.batch_end).toLocaleDateString('en-GB')}</p>
               <button onClick={() => handleRemove(product.id)}>
                <img src={cross_icon} alt="Remove" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListProduct;

            