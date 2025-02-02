import {React, useState, useEffect} from 'react'
import './VolunteerList.css';
import cross_icon from '../assets/cart_cross_icon.png'

const VolunteerList = () => {
  const [allvolunteer, setallvolunteer] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allvolunteers')
      .then((res) => res.json())
      .then((data) => {
        setallvolunteer(data);
      });
  }

  useEffect(() => {
    fetchInfo()
  }, []);

  const handleRemove = async (id) => {
              await fetch('http://localhost:4000/removevolunteer',{
                method: 'POST',
                headers:{
                  Accept:'application/json',
                  'Content-type': 'application/json',
                },
                body:JSON.stringify({id:id})
              })
              await fetchInfo();
  }

  return (
    <div className='faculty-product'>
      <div className="faculty-product-head">
        <p>Name</p>
        <p>Image</p>
       <p>About</p>
        <p>Remove</p>
      </div>
      <div className="faculty-product-main">
        <hr />
        {allvolunteer.map((volunteer, index) => {
          return (
            <div key={index} className="faculty-product-format-main faculty-product-format">
              <p>{volunteer.volunteer}</p>
              <img src={volunteer.image} alt="not found" />
               <p>{volunteer.about_volunteer}</p> 
               <button onClick={() => handleRemove(volunteer.id)}>
                <img src={cross_icon} alt="Remove" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default VolunteerList
