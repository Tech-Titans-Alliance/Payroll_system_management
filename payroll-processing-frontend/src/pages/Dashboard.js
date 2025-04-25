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
    activeEmployees: 3,
    inactiveEmployees: 2,
  };

  const chartData = [
    { name: 'Active Employees', value: dashboardData.activeEmployees },
    { name: 'Departments', value: dashboardData.departmentCount },
    { name: 'Inactive Employees', value: dashboardData.inactiveEmployees },
  ];

  const chartColors = ['#34c38f', '#007bff', '#b5121b'];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📊 Payroll Dashboard</h2>
      <p style={styles.subtitle}>Welcome to the Payroll Processing System</p>

      {/* Dashboard Cards */}
      <div style={styles.cardsWrapper}>
        <DashboardCard
          label="👥 Total Employees"
          value={dashboardData.totalEmployees}
          link="/employees"
        />
        <DashboardCard
          label="📋 Reports"
          value="View Reports"
          link="/payroll-report"
        />
        <DashboardCard
          label="💼 Payroll Form"
          value="Create Payroll"
          link="/process-payroll"
        />
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
                <Cell
                  key={`cell-${index}`}
                  fill={chartColors[index % chartColors.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const DashboardCard = ({ label, value, link }) => {
  return (
    <Link to={link} style={styles.cardLink}>
      <div style={styles.card}>
        <h4 style={styles.cardTitle}>{label}</h4>
        <p style={styles.cardValue}>{value}</p>
      </div>
    </Link>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f4f7fb',
  },
  title: {
    textAlign: 'center',
    marginBottom: '5px',
    color: '#b5121b',
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
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    textAlign: 'center',
    cursor: 'pointer',
    borderLeft: '6px solid #b5121b',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
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
  cardHover: {
    backgroundColor: '#f9f9f9',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
    transform: 'scale(1.05)',
  }
};

export default Dashboard;


