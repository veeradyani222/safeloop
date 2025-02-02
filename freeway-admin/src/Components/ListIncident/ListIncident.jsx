import React, { useEffect, useState } from 'react'
import './ListIncident.css'
import cross_icon from '../assets/cart_cross_icon.png'

const ListIncident = () => {
  const [allincidents, setallincidents] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:4000/allincidents_admin')
      .then((res) => res.json())
      .then((data) => {
        setallincidents(data);
      });
  }

  useEffect(() => {
    fetchInfo()
  }, []);

  const handleRemove = async (id) => {
              await fetch('http://localhost:4000/removeincident',{
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
    <div className='list-product'>
      <div className="list-product-head">
        <p>Incident name</p>
        <p>id</p>
        <p>Image</p>
        <p>Category</p>
        <p>Sub-category</p>
        <p>Incident Date</p>
        <p>Upload date</p>
        <p>Remove</p>
      </div>
      <div className="list-product-main">
        <hr />
        {allincidents.map((incident, index) => {
          return (
            <div key={index} className="list-product-format-main list-product-format">
              <p>{incident.name}</p>
              <p>{incident.id}</p>
              <img src={incident.image} alt="not found" />
              <p>{incident.category}</p> 
              <p>{incident.sub_category}</p> 
              <p>{new Date(incident.date).toLocaleDateString('en-GB')}</p>
              <p>{new Date(incident.date_upload).toLocaleDateString('en-GB')}</p>
               <button onClick={() => handleRemove(incident.id)}>
                <img src={cross_icon} alt="Remove" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListIncident;

            