import React, { useContext, useEffect, useState } from 'react';
import './Item.css';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Item = (props) => {
  const { addToWishlist } = useContext(ShopContext);
  const [isHeartClicked, setIsHeartClicked] = useState(false); // State for heart click
  const [showHearts, setShowHearts] = useState(false); // State for showing animated hearts

  // Check if the heart was clicked previously and set state accordingly
  useEffect(() => {
    const heartState = localStorage.getItem(`heartClicked_${props.id}`);
    if (heartState === 'true') {
      setIsHeartClicked(true);  // If stored state exists, set heart as clicked
    }
  }, [props.id]);

  const handleHeartClick = () => {
    addToWishlist(props.id);  // Ensure the wishlist functionality is called
    setIsHeartClicked(true);  // Set heart to red
    setShowHearts(true);      // Trigger animation
    localStorage.setItem(`heartClicked_${props.id}`, 'true');  // Save state in localStorage

    // Remove animated hearts after a while
    setTimeout(() => {
      setShowHearts(false);
    }, 2000);
  };

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
            <div className="lecturer">{props.lecturer}</div>
          </div>
          <div className="other_details_items">
            <div className="item_prices">
              <div className="new_price">₹{props.new_price}</div>
              <div className="old_price">₹{props.old_price}</div>
            </div>
            {/* Heart Button */}
            <div className="heart-button" onClick={handleHeartClick}>
            <FontAwesomeIcon  icon={faHeart}className={isHeartClicked ? "clicked" : ""} />  
              {showHearts && <div className="heart-animation"> 
                 <FontAwesomeIcon  icon={faHeart}className={isHeartClicked ? "clicked" : ""} />  
                 <FontAwesomeIcon icon={faHeart}  className={isHeartClicked ? "clicked" : ""} />  
                 <FontAwesomeIcon  icon={faHeart}  className={isHeartClicked ? "clicked" : ""}  />
                 </div>} 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
