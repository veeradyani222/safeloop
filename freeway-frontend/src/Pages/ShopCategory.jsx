import React , {useContext} from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import Item from '../Components/Item/Item'

const ShopCategory = (props) => {
  const {allincidents} = useContext(ShopContext)
  return (
    <div className='ShopCategory'>
        <div className="ShopCategory_index_sort">
          <p>Showing all available Courses</p>
        </div>
       
        <div className="ShopCategory_products">
          {allincidents.map((item,i) => {
            if(props.category===item.category){
              return <Item key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              category={item.category}
              sub_category={item.sub_category}
              date={item.date}
              time={item.time}
             />
            }
            else{return null}            
          }
          
          )}
        </div>
      
    </div>
  )
}

export default ShopCategory
 