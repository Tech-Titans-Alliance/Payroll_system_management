import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const Dashboard = () => {
  const dashboardData = {
    totalEmployees: 5,
    departmentCount: 5,
    monthlyPay: 250000,
    payslipsIssued: 25,
  };

  const chartData = [
    { name: 'Employees', value: dashboardData.totalEmployees },
    { name: 'Departments', value: dashboardData.departmentCount },
    { name: 'Payslips', value: dashboardData.payslipsIssued },
  ];

  const chartColors = ['#4e8cff', '#34c38f', '#ffbb44']; // Different colors for each bar

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Payroll Dashboard</h2>
      <p style={styles.subtitle}>Welcome to the Payroll Processing System</p>

      {/* Dashboard Cards */}
      <div style={styles.cardsWrapper}>
        <DashboardCard label="👥 Total Employees" value={dashboardData.totalEmployees} link="/employees" />
        <DashboardCard label="🏢 Departments" value={dashboardData.departmentCount} link="/departments" />
        <DashboardCard label="💰 Monthly Pay" value={`R${dashboardData.monthlyPay.toLocaleString()}`} link="/monthly-pay" />
        <DashboardCard label="📄 Payslips Issued" value={dashboardData.payslipsIssued} link="/payslips" />
        <DashboardCard label="📋 Reports" value="View Reports" link="/payroll-report" />
      </div>

      {/* Chart */}
      <div style={styles.chartContainer}>
        <h3 style={styles.chartTitle}>📈 Overview Chart</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DashboardCard = ({ label, value, link }) => (
  <Link to={link} style={styles.cardLink}>
    <div style={styles.card}>
      <h4 style={styles.cardTitle}>{label}</h4>
      <p style={styles.cardValue}>{value}</p>
    </div>
  </Link>
);

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '5px',
    color: '#4e8cff', // updated title color
  },
  subtitle: {
    textAlign: 'center',
    color: '#555',
    marginBottom: '30px',
  },
  cardsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
    marginBottom: '40px',
  },
  cardLink: {
    textDecoration: 'none',
    flex: '1 1 200px',
    maxWidth: '240px',
  },
  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    textAlign: 'center',
    transition: 'all 0.3s ease-in-out',
    cursor: 'pointer',
  },
  cardTitle: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#333',
  },
  cardValue: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#222',
  },
  chartContainer: {
    marginTop: '40px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
  },
  chartTitle: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#444',
  },
};

export default Dashboard;

