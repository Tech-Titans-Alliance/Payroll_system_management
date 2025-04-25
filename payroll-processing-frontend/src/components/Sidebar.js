import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignOutAlt, FaTachometerAlt, FaClipboard, FaChartBar, FaMagic, FaLock, FaFeatherAlt } from 'react-icons/fa';

const Sidebar = () => (
  <div>
    <style jsx>{`
      .sidebar {
        width: 300px;
        background-color: #c4beb6;
        color: white;
        height: 100vh;
        padding-top: 20px;
        font-family: 'Segoe UI', sans-serif;
        box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
        border-right: 1px solid #ddd;
        position: relative;
      }

      .sidebar a {
        color: white;
        text-decoration: none;
        display: block;
        padding: 15px;
        font-size: 22px;
        font-weight: bold;
        border-radius: 8px;
        transition: background-color 0.3s ease, color 0.3s ease;
        margin: 5px 0;
      }

      .sidebar a:hover {
        background-color: #f4f4f4;
        color: #b5121b;
        transform: translateX(5px);
      }

      .sidebar .sidebar-header {
        text-align: center;
        margin-bottom: 30px;
      }

      .sidebar .sidebar-header .brand {
        font-size: 30px;
        color: #b5121b;
        font-weight: bold;
      }

      .tagline-container {
        display: flex;
        justify-content: center;
        gap: 6px;
        margin-top: 10px;
        flex-wrap: wrap;
      }

      .tag-box {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: bold;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        background-color: #fff;
        color: #b5121b;
      }

      .tag-box.secure {
        background-color: #b5121b;
        color: #fff;
      }

      .tag-box.simple {
        background-color: #0077cc;
        color: #fff;
      }

      .sidebar-links {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* Change this to 'flex-start' to align to the left */
        justify-content: flex-start; /* Change this to 'flex-start' to align to the top */
        padding-left: 20px; /* Add padding for a bit of spacing from the left edge */
      }

      .sidebar-footer {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
      }

      .logout-link {
        display: block;
        padding: 10px;
        font-size: 14px;
        color: #f44336;
        text-decoration: none;
        border-radius: 6px;
        transition: background-color 0.2s;
      }

      .logout-link:hover {
        background-color: rgba(244, 67, 54, 0.1);
        color: #f44336;
      }
    `}</style>

    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="brand">💼 PayXpert</h1>
        <div className="tagline-container">
          <span className="tag-box"><FaMagic /> Smooth</span>
          <span className="tag-box secure"><FaLock /> Secure</span>
          <span className="tag-box simple"><FaFeatherAlt /> Simple</span>
        </div>
      </div>

      <nav className="sidebar-links">
        <Link to="/dashboard"><FaTachometerAlt /> Dashboard</Link>
        <Link to="/process-payroll"><FaClipboard /> Payroll Form</Link>
        <Link to="/payroll-report"><FaChartBar /> Payroll Report</Link>
      </nav>

      <div className="sidebar-footer">
        <Link to="/logout" className="logout-link">
          <FaSignOutAlt /> Logout
        </Link>
      </div>
    </div>
  </div>
);

export default Sidebar;

