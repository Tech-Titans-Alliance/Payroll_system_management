import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPayslipDates } from '../services/api';

const PayslipDates = ({ employee, onSelectDate }) => {
  const { employeeId } = useParams();
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await getPayslipDates(employeeId || employee?.id);
        setDates(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDates();
  }, [employeeId, employee]);

  const handleSelect = (date) => {
    onSelectDate(date);
    navigate(`/payslip/${employeeId || employee?.id}/${date}`);
  };

  if (loading) return <div className="loading">Loading payslip dates...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="payslip-dates">
      <h2>Payslips for {employee?.name || 'Employee'}</h2>
      <div className="date-list">
        {dates.map(date => (
          <div 
            key={date} 
            className="date-card"
            onClick={() => handleSelect(date)}
          >
            {new Date(date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PayslipDates;