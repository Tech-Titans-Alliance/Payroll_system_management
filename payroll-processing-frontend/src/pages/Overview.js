import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { FaUsers, FaMoneyBillWave, FaClock, FaCalendarAlt, FaShieldAlt } from 'react-icons/fa';

const Overview = () => {
  return (
    <div className="container" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main" style={{ flex: 1, padding: '40px' }}>
        <Header title="Payroll Overview" />

        <div style={styles.grid}>
          <div style={styles.card}>
            <FaUsers size={24} color="#4caf50" />
            <h3>Total Employees</h3>
            <p>20</p>
          </div>
          <div style={styles.card}>
            <FaMoneyBillWave size={24} color="#2196f3" />
            <h3>Total Monthly Payroll</h3>
            <p>R300,000</p>
          </div>
          <div style={styles.card}>
            <FaClock size={24} color="#ff9800" />
            <h3>Pending Approvals</h3>
            <p>2</p>
          </div>
          <div style={styles.card}>
            <FaCalendarAlt size={24} color="#9c27b0" />
            <h3>Last Payroll Processed</h3>
            <p>April 1, 2025</p>
          </div>
          <div style={styles.card}>
            <FaShieldAlt size={24} color="#f44336" />
            <h3>Security Status</h3>
            <p>Encrypted & Backed Up</p>
          </div>
        </div>

        <div style={styles.trendSection}>
          <h3>Payroll Trends</h3>
          <p>Coming soon: You’ll be able to track salary, bonuses, deductions, and growth insights over time 📈</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  trendSection: {
    marginTop: '40px',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    borderRadius: '10px',
    fontStyle: 'italic'
  }
};

export default Overview;
