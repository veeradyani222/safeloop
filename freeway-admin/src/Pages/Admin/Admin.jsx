import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Route , Routes} from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import AddLecturer from '../../Components/AddLecturer/AddLecturer'
import LecturerList from '../../Components/LecturerList/LecturerList'
import EditSlider from '../../Components/EditSlider/EditSlider'
import SliderList from '../../Components/SliderList/SliderList'
import AddContent from '../../Components/EditWebsite/AddContent'
import EditContent from '../../Components/EditContent/EditContent'
import ViewAnalytics from '../../Components/ViewAnalytics/ViewAnalytics'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>}/>
        <Route path='/listproduct' element={<ListProduct/>}/>
        <Route path='/editSlider' element={<EditSlider/>}/>
        <Route path='/addContent' element={<AddContent/>}/>
        <Route path='/editContent' element={<EditContent/>}/>
        <Route path='/addLecturer' element={<AddLecturer/>}/>
        <Route path='/viewLecturerList' element={<LecturerList/>}/>
        <Route path='/SliderList' element={<SliderList/>}/>
        <Route path='/viewAnalytics' element={<ViewAnalytics/>}/>
      </Routes>
    </div>
  )
}

export default Admin
