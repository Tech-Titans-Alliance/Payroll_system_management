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
    <div className="employee-list">
      <h2>Employee List</h2>
      <div className="card-container">
        {employees.map(employee => (
          <div 
            key={employee.id} 
            className="employee-card"
            onClick={() => handleSelect(employee)}
          >
            <h3>{employee.name}</h3>
            <p>ID: {employee.id}</p>
            <p>Department: {employee.department}</p>
            <p>Position: {employee.position}</p>
            <p>Status: {employee.status === 'A' ? 'Active' : 'Inactive'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;