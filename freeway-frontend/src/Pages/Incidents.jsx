import React, { useContext } from 'react';
import './CSS/Courses.css';
import Item from '../Components/Item/Item'
import { ShopContext } from '../Context/ShopContext'

const Incidents = () => {

  const { allincidents } = useContext(ShopContext);
  console.log(allincidents)

  return (
    <div className="courses-container">
      {allincidents && allincidents.length > 0 ? (
        allincidents.map((product) => (
          <Item
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
        <p>No courses available</p>
      )}
    </div>
  );
};

export default Incidents;

