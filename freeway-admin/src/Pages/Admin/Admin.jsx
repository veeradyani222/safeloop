import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Route , Routes} from 'react-router-dom'
import EditSlider from '../../Components/EditSlider/EditSlider'
import SliderList from '../../Components/SliderList/SliderList'
import AddContent from '../../Components/EditWebsite/AddContent'
import EditContent from '../../Components/EditContent/EditContent'
import ViewAnalytics from '../../Components/ViewAnalytics/ViewAnalytics'
import AddIncident_Admin from '../../Components/AddIncident_admin/AddIncident_Admin'
import ListIncident from '../../Components/ListIncident/ListIncident'
import AddVolunteer from '../../Components/AddVolunteer/AddVolunteer'
import VolunteerList from '../../Components/VolunteerList/VolunteerList'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addincident_admin' element={<AddIncident_Admin/>}/>
        <Route path='/listincident' element={<ListIncident/>}/>
        <Route path='/editSlider' element={<EditSlider/>}/>
        <Route path='/addContent' element={<AddContent/>}/>
        <Route path='/editContent' element={<EditContent/>}/>
        <Route path='/addvolunteer' element={<AddVolunteer/>}/>
        <Route path='/viewvolunteerlist' element={<VolunteerList/>}/>
        <Route path='/SliderList' element={<SliderList/>}/>
        <Route path='/viewAnalytics' element={<ViewAnalytics/>}/>
      </Routes>
    </div>
  )
}

export default Admin
