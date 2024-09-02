import React, { useContext } from 'react'
import './CSS/Product.css'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import BreadCrum from '../Components/BreadCrums/BreadCrum'
import ProductDisplay from '../Components/ProductDispay/ProductDisplay'



const Product = () => {
  const {all_products}= useContext(ShopContext);
  const {productId}= useParams();
  const product = all_products.find((e)=>e.id===Number(productId))
  return (
    <div>
<BreadCrum product={product}/>
<ProductDisplay product={product}/>



      
    </div>
  )
}

export default Product
