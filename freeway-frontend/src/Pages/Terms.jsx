import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
 import './CSS/Terms.css'
const Terms = () => {
    const { all_Content } = useContext(ShopContext); // Retrieve all_content from context

  // Find the object that contains the "about_sections"
  const terms_conditions = all_Content.find(content => content.terms_conditions);
  return (
    <div>
        <div className="terms-containers">
      {terms_conditions && terms_conditions.terms_conditions.length > 0 ? (
        terms_conditions.terms_conditions[0].split(',').map((paragraph, index) => ( // Split the string by commas
          <p className='terms' key={index}>{paragraph.trim()}</p> // Trim spaces and render each paragraph
        ))
      ) : (
        <p>No terms available</p> // Fallback if about_sections is empty
      )}
    </div>
    </div>
  )
}

export default Terms
