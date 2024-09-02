import React from 'react'
 import './Main.css';
 import heroImage from '../assets/hero-image.png';
 

const Main = () => {
  return (
    <div className='main'>
      <div className="hero-element">
        <div className="hero-left">
            <p>New arrivals every day!</p>
            <p>Dont search for trends</p>
            <p>Let the trends search you</p>
            <div className="latest-button">Shop Latest Arrivals</div>
        </div>
        <div className="hero-right">
            <img className='heroImage' src={heroImage} alt="" />
            
        </div>
      </div>
    </div>
  )
}

export default Main
