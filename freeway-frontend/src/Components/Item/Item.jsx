import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

// Function to format date as dd/mm/yyyy
const formatDate = (dateStr) => {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) throw new Error("Invalid date");
    return date.toLocaleDateString('en-GB'); // day/month/year
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

// Function to format time as hh:mm
const formatTime = (timeStr) => {
  try {
    const date = new Date(timeStr);
    if (isNaN(date.getTime())) throw new Error("Invalid time");
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }); // 3:09
  } catch (error) {
    console.error("Error formatting time:", error);
    return "Invalid Time";
  }
};

const Item = (props) => {
  return (
    <div>
      <div className="item">
        <Link to={`/product/${props.id}`}>
          <img src={props.image} alt="" />
        </Link>
        <div className="item-details">
          <p className="item_name">{props.name}</p>
          <div className="imp-details">
            <div className="sub-cat">
              {props.category}-{props.sub_category}
            </div>
          </div>
          <div className="other_details_items">
            <div className="item_prices">
              <div className="new_price">{formatDate(props.date)}</div>
              <div className="old_price">{props.time}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
