import React from 'react'
import Main from '../Components/Main/Main.jsx';
import Popular from '../Components/Popular/Popular.jsx';
import Offers from '../Components/Offers/Offers.jsx';
import NewCollection from '../Components/NewCollection/NewCollection.jsx';
const Shop = () => {
  return (
    <div>
       <Main/>
       <Popular/>
       <Offers discount={"10%"} code={"11VEER11"}/>
       <NewCollection/>
    </div>
  )
}

export default Shop
