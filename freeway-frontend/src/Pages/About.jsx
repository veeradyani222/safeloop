import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import './CSS/About.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglass, faLink, faStar, faGraduationCap } from '@fortawesome/free-solid-svg-icons';


const About = () => {
  const { all_Content } = useContext(ShopContext); // Retrieve all_content from context

  // Find the object that contains the "about_sections"
  const aboutContent = all_Content.find(content => content.about_sections);

  return (
    <div>
      <div className="decorations">
      <FontAwesomeIcon icon={faHourglass} />
      <FontAwesomeIcon icon={faLink} />
      <FontAwesomeIcon icon={faStar} />
      <FontAwesomeIcon icon={faGraduationCap} />
      </div>
      <div className="about-containers">
      {aboutContent && aboutContent.about_sections.length > 0 ? (
        aboutContent.about_sections[0].split(',').map((paragraph, index) => ( // Split the string by commas
          <p key={index}>{paragraph.trim()}</p> // Trim spaces and render each paragraph
        ))
      ) : (
        <p>No content available</p> // Fallback if about_sections is empty
      )}
    </div>
    </div>
  );
}

export default About;
