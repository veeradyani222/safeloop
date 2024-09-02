import React , {useContext} from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'; 
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const {all_products} = useContext(ShopContext)
  return (
    <div className='ShopCategory'>
      <div className="banner">
        <img className='banner' src={props.banner} alt="" />
        </div>
        <div className="ShopCategory_index_sort">
          <p>Showing all available products</p>
        </div>
       
        <div className="ShopCategory_products">
          {all_products.map((item,i) => {
            if(props.category===item.category){
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }
            else{return null}            
          }
          
          )}
        </div>
      
    </div>
  )
}

export default ShopCategory
 