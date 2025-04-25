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
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSelect = (employee) => {
    onSelectEmployee(employee);
    navigate(`/payslips/${employee.id}`);
  };

  if (loading) return <div className="loading">Loading employees...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <>
      <style>{`
  .employee-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* vertically centers the content */
    padding: 2rem;
    background: #f9f9fc;
    min-height: 100vh;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
  }

  .employee-list h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: #333;
  }

  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    width: 100%;
    max-width: 1000px;
    justify-content: center;
  }

  .employee-card {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    border-left: 5px solid #4e8cff;
  }

  .employee-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
    border-left-color: #2e64e3;
  }

  .employee-card h3 {
    margin: 0 0 0.5rem;
    font-size: 1.3rem;
    color: #222;
  }

  .employee-card p {
    margin: 0.3rem 0;
    color: #555;
    font-size: 0.95rem;
  }

  .loading,
  .error {
    text-align: center;
    font-size: 1.2rem;
    padding: 2rem;
    color: #666;
  }

  .error {
    color: red;
  }
`}</style>
      <div className="employee-list">
        <h2>👨‍💼 Meet the Team</h2>
        <div className="card-container">
          {employees.map(employee => (
            <div 
              key={employee.id} 
              className="employee-card"
              onClick={() => handleSelect(employee)}
            >
              <h3>{employee.name}</h3>
              <p><strong>ID:</strong> {employee.id}</p>
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Position:</strong> {employee.position}</p>
              <p><strong>Status:</strong> {employee.status === 'A' ? '✅ Active' : '❌ Inactive'}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
