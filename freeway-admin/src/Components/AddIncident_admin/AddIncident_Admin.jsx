import React, { useState, useEffect } from 'react';
import './AddIncident_Admin.css';
import upload_image from '../assets/upload_image.png';

const AddIncident_Admin = () => {
  const [image, setImage] = useState(null);
  const [incidentDetails, setIncidentDetails] = useState({
    name: "",
    image: "",
    category: "",
    sub_category: "",
    tips: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });

  const categorySubCategories = {
    "Harassment": [
      "Sexual Harassment",
      "Mental Harassment"
    ],
    "Discrimination": [
      "Racial Discrimination",
      "Gender Discrimination",
      "Disability Discrimination"
    ],
    "Workplace Safety": [
      "Physical Safety",
      "Health & Hygiene"
    ],
    "Fraud & Misconduct": [
      "Financial Fraud",
      "Ethical Misconduct"
    ],
    "Environmental Issues": [
      "Pollution",
      "Resource Mismanagement"
    ],
    "Customer Service": [
      "Service Complaints",
      "Product Issues"
    ],
    "Legal & Compliance": [
      "Regulatory Violations",
      "Legal Disputes"
    ],
    "Operational Failures": [
      "System Outages",
      "Process Inefficiencies"
    ]
  }
  

  const [subCategoryOptions, setSubCategoryOptions] = useState([]);

  useEffect(() => {
    const options = categorySubCategories[incidentDetails.category] || [];
    setSubCategoryOptions(options);
  }, [incidentDetails.category]);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    setIncidentDetails({ ...incidentDetails, image: e.target.files[0] });
  };

  const changeHandler = (e) => {
    setIncidentDetails({ ...incidentDetails, [e.target.name]: e.target.value });
  };

  const addIncident = async (e) => {
    e.preventDefault();
    console.log(incidentDetails);

    let incident = { ...incidentDetails };
    let responseData;
    let formData = new FormData();
    formData.append('image', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => { responseData = data });

    if (responseData.success) {
      incident.image = responseData.image_url;
    }

    console.log(incident);
    await fetch('http://localhost:4000/addincident_admin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(incident)
    }).then((resp) => resp.json()).then((data) => {
      data.success ? alert("Incident Added!") : alert("Failed!")
    });
  };

  return (
    <div className="add-product-container">
      <h1 className="heading">Fill the Below Fields</h1>
      <form className="add-product-form" onSubmit={addIncident}>
        <input
          type="text"
          name="name"
          placeholder="Incident Name"
          className="input-field"
          value={incidentDetails.name}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="input-field"
          value={incidentDetails.location}
          onChange={changeHandler}
        />
        <input
          type="date"
          name="date"
          placeholder="Date"
          className="input-field"
          value={incidentDetails.date}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="time"
          placeholder="Time"
          className="input-field"
          value={incidentDetails.time}
          onChange={changeHandler}
        />
        <select
          name="category"
          className="input-field category-field"
          value={incidentDetails.category}
          onChange={changeHandler}
        >
          <option value="" disabled>Select Category</option>
         
  <option value="Harassment">Harassment</option>
  <option value="Discrimination">Discrimination</option>
  <option value="Workplace Safety">Workplace Safety</option>
  <option value="Fraud & Misconduct">Fraud & Misconduct</option>
  <option value="Environmental Issues">Environmental Issues</option>
  <option value="Customer Service">Customer Service</option>
  <option value="Legal & Compliance">Legal & Compliance</option>
  <option value="Operational Failures">Operational Failures</option>


        </select>
        <select
          name="sub_category"
          className="input-field"
          value={incidentDetails.sub_category}
          onChange={changeHandler}
          disabled={subCategoryOptions.length === 0}
        >
          <option value="" disabled>Select Sub-Category</option>
          {subCategoryOptions.map((subCategory, index) => (
            <option key={index} value={subCategory}>{subCategory}</option>
          ))}
        </select>
        <textarea
          name="description"
          placeholder="Description"
          className="input-field description-field"
          value={incidentDetails.description}
          onChange={changeHandler}
        />
        <textarea
          name="tips"
          placeholder="Safety Tips"
          className="input-field tips-field"
          value={incidentDetails.tips}
          onChange={changeHandler}
        />
        <label htmlFor="product-image" className="custom-file-upload">
          <img src={image ? URL.createObjectURL(image) : upload_image} alt="Upload" />
        </label>
        <input
          type="file"
          id="product-image"
          accept="image/*"
          className="input-field file-input"
          name="image"
          onChange={imageHandler}
        />
        <button type="submit" className="submit-button">Add Incident</button>
      </form>
    </div>
  );
};

export default AddIncident_Admin;
