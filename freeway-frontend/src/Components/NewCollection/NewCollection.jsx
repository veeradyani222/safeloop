import {React,useState,useEffect} from 'react'
import './NewCollection.css'
import Item from '../Item/Item'


const NewCollection = () => {
  const [new_collections, setnew_collections] = useState([])

useEffect(() => {
  fetch('https://freeway-web.onrender.com/newcollections')
  .then((response)=>response.json())
  .then((data)=>setnew_collections(data))
  }, [])
  
  return (
    <div className='new_collections'>
        <div className="new_collection">
            <h1>Explore the new collection ❤️
            </h1>

        </div>
    <div className="new_items">
        {new_collections.map((item,i)=>{
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
        })}

    </div>

    </div>
  )
}

export default NewCollection
