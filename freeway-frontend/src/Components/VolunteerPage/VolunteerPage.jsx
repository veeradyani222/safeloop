import React, { useContext } from 'react';
import './VolunteerPage.css'
import ItemVolunteer from '../ItemVolunteer/ItemVolunteer';
import { ShopContext } from '../../Context/ShopContext';
const VolunteerPage = () => {
    const { allvolunteers } = useContext(ShopContext);
    console.log(allvolunteers)
  
    return (
      <div className="courses-container">
        {allvolunteers && allvolunteers.length > 0 ? (
          allvolunteers.map((product) => (
            <ItemVolunteer
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            category={product.category}
            sub_category={product.sub_category}
            date={product.date}
            time={product.time}

            />
          ))
        ) : (
          <p>No volunteers available</p>
        )}
      </div>
    );
}

export default VolunteerPage
