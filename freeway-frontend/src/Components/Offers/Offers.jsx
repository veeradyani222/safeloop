
import React , {useState} from 'react'
import './Offers.css'
import OfferImage1 from '../assets/OfferImage1.png'
import OfferImage2 from '../assets/OfferImage2.png'
import OfferImage3 from '../assets/OfferImage3.png'


const Offers = ({discount,code}) => {

const [copied, setcopied] = useState(false)

const handleCopy = () => {
    navigator.clipboard.writeText(code)
    .then(()=>setcopied(true))
    .catch((err) => console.error('Failed to copy: ', err));
};


  return (
    <div>
      <div className="offer_heading"><h1>Offers available sitewide this month!</h1></div>
      <div className="offer_page">
        <div className="offers_top">
       <img src={OfferImage1} alt="" />
       <img src={OfferImage3} alt="" />
       <img src={OfferImage2} alt="" />
       </div>
       <div className="offers_bottom">
        <h2>Use the below promo code to avail additional {discount} off on all purchases!</h2>
        <div className="promo_code">{code}</div>
        <button onClick={handleCopy}>{copied?'Copied!':'Copy Code'}</button>
       </div>
       
       

        
      </div>

    </div>
  )
}

export default Offers
