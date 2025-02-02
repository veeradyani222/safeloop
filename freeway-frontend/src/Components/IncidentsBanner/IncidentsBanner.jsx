import React from 'react';
import './IncidentsBanner.css';
import { Link } from 'react-router-dom';

const IncidentsBanner = () => {
  return (
    <div className="incidents-banner" >
      <div className="heading">
        View Incidents based on category
      </div>
      <div className="categories">
        <Link to="/Incidents/Harassment">
          <li>Harassment</li>
        </Link>
        <Link to="/Incidents/Discrimination">
          <li>Discrimination</li>
        </Link>
        <Link to="/Incidents/Workplace-Safety">
          <li>Workplace Safeties</li>
        </Link>
        <Link to="/Incidents/Fraud-Misconduct">
          <li>Fraud & Misconduct</li>
        </Link>
        <Link to="/Incidents/Environmental-Issues">
          <li>Environmental Issues</li>
        </Link>
        <Link to="/Incidents/Customer-Service">
          <li>Customer Service</li>
        </Link>
        <Link to="/Incidents/Legal-Compliance">
          <li>Legal & Compliance</li>
        </Link>
        <Link to="/Incidents/Operational-Failures">
          <li>Operational Failures</li>
        </Link>
      </div>
    </div>
  );
};

export default IncidentsBanner;
