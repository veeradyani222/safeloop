import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div>
      <div className="item">
       <Link to={`/product/${props.id}`}> <img src={props.image} alt="" /></Link> 
        <p className='item_name'>{props.name}</p>
        <div className="other_details_items">
        <div className="item_prices">
        <div className="new_price">
         ${props.new_price}
                </div>
          <div className="old_price">
            ${props.old_price}
            </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Item
