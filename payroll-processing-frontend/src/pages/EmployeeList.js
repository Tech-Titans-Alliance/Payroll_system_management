import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees } from '../services/api';

const EmployeeList = ({ onSelectEmployee }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await getEmployees();
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load employee data. Please try again later.');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSelect = (employee) => {
    onSelectEmployee(employee);
    navigate(`/payslips/${employee.id}`);
  };

  if (loading) return <div className="loading">🔄 Fetching your awesome team...</div>;
  if (error) return <div className="error">🚨 {error}</div>;

  return (
    <>
      <style>{`
  .employee-list {
    padding: 3rem 2rem;
    background: linear-gradient(135deg, #eef2f3, #f9f9fc);
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .employee-list h2 {
    text-align: center;
    font-size: 2.4rem;
    color: #2c3e50;
    margin-bottom: 2.5rem;
    position: relative;
  }

  .employee-list h2::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: #b5121b; /* Absa red */
    margin: 10px auto 0;
    border-radius: 2px;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.8rem;
    max-width: 1100px;
    margin: 0 auto;
  }

  .employee-card {
    background: #fff;
    border-radius: 16px;
    padding: 1.8rem;
    box-shadow: 0 10px 20px rgba(0,0,0,0.08);
    transition: all 0.3s ease;
    cursor: pointer;
    border-left: 6px solid #b5121b; /* Absa red */
    position: relative;
  }

  .employee-card:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 12px 28px rgba(0,0,0,0.12);
    border-left-color: #910e17; /* darker Absa red for hover */
  }

  .employee-card h3 {
    margin: 0 0 0.6rem;
    color: #333;
    font-size: 1.4rem;
  }

  .employee-card p {
    margin: 0.35rem 0;
    color: #555;
    font-size: 0.95rem;
  }

  .status-badge {
    font-weight: bold;
    display: inline-block;
    margin-top: 0.5rem;
    padding: 4px 8px;
    border-radius: 12px;
    font-size: 0.85rem;
    background-color: #ffeaea;
    color: #b5121b;
  }

  .inactive .status-badge {
    background-color: #ffe0e0;
    color: #c0392b;
  }

  .loading,
  .error {
    text-align: center;
    font-size: 1.2rem;
    padding: 2rem;
    color: #666;
  }

  .error {
    color: #e74c3c;
  }
`}</style>


<div className="employee-list">
  <h2>🚀 Meet the Dream Team</h2>
  <div className="card-container">
    {employees.map(employee => (
      <div
        key={employee.id}
        className="employee-card"
        onClick={() => handleSelect(employee)}
        title="Click to view payslips"
      >
        <h3>{employee.name}</h3>
        <p><strong>ID:</strong> {employee.id}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Position:</strong> {employee.position}</p>
        <div className="status-badge">✅ Active</div>
      </div>
    ))}
  </div>
</div>
    </>
  );
};

export default EmployeeList;
