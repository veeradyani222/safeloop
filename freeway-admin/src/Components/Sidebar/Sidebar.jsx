import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
    <center>  <Link to={"/addproduct"} style={{textDecoration:"none"}}><div className="sidebar-button">Add Product</div></Link>
    <Link to={"/listproduct"} style={{textDecoration:"none"}}><div className="sidebar-button">View Product List</div></Link></center>
    </div>
  );
};

export default Sidebar;
