import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaTachometerAlt, FaFileInvoice, FaClipboard, FaChartBar } from 'react-icons/fa';

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-header">
      <h1 className="brand">💼 PayXpert</h1>
      <p className="tagline">Smooth. Secure. Simple.</p>
    </div>

    <nav className="sidebar-links">
      <Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link>
      <Link to="/process-payroll"><FaClipboard /> Salary Form</Link>
      <Link to="/payroll-report"><FaChartBar /> Payroll Report</Link>
    </nav>

    <div className="sidebar-footer">
      <Link to="/logout" className="logout-link">
        <FaSignOutAlt /> Logout
      </Link>
    </div>
  </div>
);

export default Sidebar;
