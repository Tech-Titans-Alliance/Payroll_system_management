import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaSignOutAlt, FaTachometerAlt, FaFileInvoice, FaClipboard, FaChartBar } from 'react-icons/fa';

const Sidebar = () => (
  <div className="sidebar">
    {/* Menu at the top */}
    <div className="menu">
      <h2>Menu</h2>
    </div>

    {/* Search Bar */}
    <div className="search-bar">
      <input type="text" placeholder="Search..." />
      <FaSearch />
    </div>

    {/* Sidebar Links */}
    <div className="sidebar-links">
      <Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link>
      <Link to="/process-payroll"><FaClipboard /> Salary Form</Link>
      <Link to="/payslip"><FaFileInvoice /> Payslip</Link>
      <Link to="/overview"><FaChartBar /> Overview</Link>
    </div>

    {/* Logout */}
    <div className="sidebar-footer">
      <Link to="/logout" className="logout-link">
        <FaSignOutAlt /> Logout
      </Link>
    </div>
  </div>
);

export default Sidebar;
