import React, { useState } from 'react';
import './AddVolunteer.css';
import upload_image from '../assets/upload_image.png';

const AddVolunteer = () => {
  const [image, setImage] = useState(null);
  const [volunteer, setvolunteer] = useState({
    image: "",
    volunteer: "",
    about_volunteer: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
    setvolunteer({ ... volunteer, image: e.target.files[0] });
  };

  const changeHandler = (e) => {
    setvolunteer({ ...volunteer, [e.target.name]: e.target.value });
  };

  const addvolunteer = async (e) => {
    e.preventDefault();
    console.log(volunteer);

    let volunteerData = { ...volunteer };
    let responseData;
    let formData = new FormData();
    formData.append('image', image);

    await fetch('http://localhost:4000/upload-faculty', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData,
    })
    .then((resp) => resp.json())
    .then((data) => { responseData = data });

    if (responseData.success) {
      volunteerData.image = responseData.image_url;
    }

    console.log(volunteerData);
    await fetch('http://localhost:4000/addvolunteer', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(volunteerData)
    })
    .then((resp) => resp.json())
    .then((data) => {
      data.success ? alert("volunteer Added!") : alert("Failed!");
    });
  };

  return (
    <div className="add-product-container">
      <h1 className="heading">Fill the Below Fields</h1>
      <form className="add-product-form" onSubmit={addvolunteer}>
        <input
          type="text"
          name="volunteer"
          placeholder="Volunteer's Name"
          className="input-field"
          value={volunteer.volunteer}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="about_volunteer"
          placeholder="About Volunteer"
          className="input-field"
          value={volunteer.about_volunteer}
          onChange={changeHandler}
        />
        <label htmlFor="faculty-image" className="custom-file-upload">
          <img src={image ? URL.createObjectURL(image) : upload_image} alt="please upload image for the lecturer" />
        </label>
        <input
          type="file"
          id="faculty-image"
          accept="image/*"
          className="input-field file-input"
          name="image"
          onChange={imageHandler}
        />
        <button type="submit" className="submit-button">Add Volunteer</button>
      </form>
    </div>
  );
};

export default AddVolunteer;
