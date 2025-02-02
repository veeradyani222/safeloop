import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
    <center>  <Link to={"/addincident_admin"} style={{textDecoration:"none"}}><div className="sidebar-button">Add Incidents</div></Link>
    <Link to={"/listincident"} style={{textDecoration:"none"}}><div className="sidebar-button">View Incidents List</div></Link>
    <Link to={"/editSlider"} style={{textDecoration:"none"}}><div className="sidebar-button"> Add Slider Image</div></Link>
    <Link to={"/SliderList"} style={{textDecoration:"none"}}><div className="sidebar-button"> Edit Slider List</div></Link>
    <Link to={"/addContent"} style={{textDecoration:"none"}}><div className="sidebar-button">Add Content</div></Link>
    <Link to={"/editContent"} style={{textDecoration:"none"}}><div className="sidebar-button">Edit Content</div></Link>
    <Link to={"/addvolunteer"} style={{textDecoration:"none"}}><div className="sidebar-button">Add Volunteer</div></Link>
    <Link to={"/viewvolunteerlist"} style={{textDecoration:"none"}}><div className="sidebar-button"> View Volunteer List</div></Link>
    <Link to={"/viewAnalytics"} style={{textDecoration:"none"}}><div className="sidebar-button"> View Analytics</div></Link>
    </center>
   
    </div>
  );
};

export default Sidebar;
