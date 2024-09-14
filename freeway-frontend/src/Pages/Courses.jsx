import React, { useContext } from 'react';
import './CSS/Courses.css';
import Item from '../Components/Item/Item'
import { ShopContext } from '../Context/ShopContext'

const Courses = () => {
  // Access all_products from the context
  const { all_products } = useContext(ShopContext);
  console.log(all_products)

  return (
    <div className="courses-container">
      {all_products && all_products.length > 0 ? (
        all_products.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            category={product.category}
            sub_category={product.sub_category}
            lecturer={product.lecturer}
            new_price={product.new_price}
            old_price={product.old_price}
          />
        ))
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default Courses;

