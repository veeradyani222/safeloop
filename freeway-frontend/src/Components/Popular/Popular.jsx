import {React ,useState, useEffect} from 'react'
import './Popular.css'

import Item from '../Item/Item'
const Popular = () => {
const [popular_products, setpopular_products] = useState([])

useEffect(() => {
  fetch('http://localhost:4000/popularnow')
  .then((response)=>response.json())
  .then((data)=>setpopular_products(data))
  }, [])


  return (
    <div className='populars'>
        <div className="popular">
            <h1>POPULAR RIGHT NOW 🔥</h1>

        </div>
    <div className="popular_items">
        {popular_products.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}

    </div>

    </div>
  )
}

export default Popular
