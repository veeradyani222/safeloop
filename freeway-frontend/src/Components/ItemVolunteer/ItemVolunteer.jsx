import React from 'react';
import './ItemVolunteer.css';
import { Link } from 'react-router-dom';


const ItemVolunteer = (props) => {
  return (
    <div>
      <div className="item">
        <Link to={`/product/${props.id}`}>
          <img src={props.image} alt="" />
        </Link>
        <div className="item-details">
          <p className="item_name">{props.name}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemVolunteer;
