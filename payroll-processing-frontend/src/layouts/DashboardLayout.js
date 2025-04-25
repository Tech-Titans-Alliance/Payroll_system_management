import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        
        <Outlet /> {/* Child routes render here */}
      </div>
    </div>
  );
};

export default DashboardLayout;
