import React from 'react'

import './CSS/Home.css'
import Sliders from '../Components/Sliders/Sliders'
import IncidentsBanner from '../Components/IncidentsBanner/IncidentsBanner'
import VolunteerPage from '../Components/VolunteerPage/VolunteerPage'
const Home = () => {

  return (
    <div>
       <Sliders/>
       <IncidentsBanner/>
       <VolunteerPage/>
    </div>
  )
}

export default Home
