import React, { useState } from 'react';
import './AddContent.css';

const AddContent = () => {
  const [content, setContent] = useState({
    about_sections: [],
    terms_conditions: [],
    contact_numbers: [],
    email_ids: [],
    addresses: [],
    instagram: "",
    github: "",
    facebook: "",
    twitter: "",
    promo_code: "",
    offer_percentage: ""
  });

  const [inputFields, setInputFields] = useState({
    about_sections: [""],
    terms_conditions: [""],
    contact_numbers: [""],
    email_ids: [""],
    addresses: [""]
  });

  // Handle input changes
  const handleInputChange = (e, field, index) => {
    const { value } = e.target;
    const updatedFields = [...inputFields[field]];
    updatedFields[index] = value;
    setInputFields({ ...inputFields, [field]: updatedFields });
  };

  // Add More Input Fields
  const addMoreFields = (field) => {
    setInputFields({ ...inputFields, [field]: [...inputFields[field], ""] });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update content with current input fields
    const updatedContent = {
      ...content,
      about_sections: inputFields.about_sections.filter(item => item.trim() !== ""),
      terms_conditions: inputFields.terms_conditions.filter(item => item.trim() !== ""),
      contact_numbers: inputFields.contact_numbers.filter(item => item.trim() !== ""),
      email_ids: inputFields.email_ids.filter(item => item.trim() !== ""),
      addresses: inputFields.addresses.filter(item => item.trim() !== ""),
      instagram: content.instagram,
      github: content.github,
      facebook: content.facebook,
      twitter: content.twitter,
      promo_code: content.promo_code,
      offer_percentage: content.offer_percentage
    };

    try {
      const response = await fetch('http://localhost:4000/addContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedContent),
      });

      const result = await response.json();

      if (result.success) {
        alert('Content added successfully!');
        console.log('Added Data:', result.content);

        // Reset content after successful submission
        setContent({
          about_sections: [],
          terms_conditions: [],
          contact_numbers: [],
          email_ids: [],
          addresses: [],
          instagram: "",
          github: "",
          facebook: "",
          twitter: "",
          promo_code: "",
          offer_percentage: ""
        });

        // Reset input fields after successful submission
        setInputFields({
          about_sections: [""],
          terms_conditions: [""],
          contact_numbers: [""],
          email_ids: [""],
          addresses: [""]
        });
      } else {
        alert('Failed to add content');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding content.');
    }
  };

  return (
    <div className="edit-website-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>About Sections</label>
          {inputFields.about_sections.map((field, index) => (
            <div key={index} className="input-wrapper">
              <input
                type="text"
                value={field}
                placeholder="Enter about section"
                onChange={(e) => handleInputChange(e, 'about_sections', index)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addMoreFields('about_sections')}>Add More</button>
        </div>

        <div className="form-group">
          <label>Terms & Conditions</label>
          {inputFields.terms_conditions.map((field, index) => (
            <div key={index} className="input-wrapper">
              <input
                type="text"
                value={field}
                placeholder="Enter term or condition"
                onChange={(e) => handleInputChange(e, 'terms_conditions', index)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addMoreFields('terms_conditions')}>Add More</button>
        </div>

        <div className="form-group">
          <label>Contact Numbers</label>
          {inputFields.contact_numbers.map((field, index) => (
            <div key={index} className="input-wrapper">
              <input
                type="text"
                value={field}
                placeholder="Enter contact number"
                onChange={(e) => handleInputChange(e, 'contact_numbers', index)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addMoreFields('contact_numbers')}>Add More</button>
        </div>

        <div className="form-group">
          <label>Email IDs</label>
          {inputFields.email_ids.map((field, index) => (
            <div key={index} className="input-wrapper">
              <input
                type="text"
                value={field}
                placeholder="Enter email ID"
                onChange={(e) => handleInputChange(e, 'email_ids', index)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addMoreFields('email_ids')}>Add More</button>
        </div>

        <div className="form-group">
          <label>Addresses</label>
          {inputFields.addresses.map((field, index) => (
            <div key={index} className="input-wrapper">
              <input
                type="text"
                value={field}
                placeholder="Enter address"
                onChange={(e) => handleInputChange(e, 'addresses', index)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addMoreFields('addresses')}>Add More</button>
        </div>

        {/* Social Media */}
        <div className="form-group">
          <input
            type="text"
            name="instagram"
            value={content.instagram}
            placeholder="Instagram URL"
            onChange={(e) => setContent({ ...content, instagram: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="github"
            value={content.github}
            placeholder="GitHub URL"
            onChange={(e) => setContent({ ...content, github: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="facebook"
            value={content.facebook}
            placeholder="Facebook URL"
            onChange={(e) => setContent({ ...content, facebook: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="twitter"
            value={content.twitter}
            placeholder="Twitter URL"
            onChange={(e) => setContent({ ...content, twitter: e.target.value })}
          />
        </div>

        {/* Promo and Offer */}
        <div className="form-group">
          <input
            type="text"
            name="promo_code"
            value={content.promo_code}
            placeholder="Promo Code"
            onChange={(e) => setContent({ ...content, promo_code: e.target.value })}
          />
        </div>

        <div className="form-group">
          <input
            type="number"
            name="offer_percentage"
            value={content.offer_percentage}
            placeholder="Offer Percentage"
            onChange={(e) => setContent({ ...content, offer_percentage: e.target.value })}
          />
        </div>

        <button type="submit" className="submit-btn">Add Content</button>
      </form>
    </div>
  );
};

export default AddContent;
