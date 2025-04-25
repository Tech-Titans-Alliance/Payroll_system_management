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
    <>
      <style>{`
  .payslip-dates {
    padding: 2rem;
    background-color: #f4f7fb;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    min-height: 100vh;
  }

  .payslip-dates h2 {
    text-align: center;
    font-size: 2rem;
    color: #333;
    margin-bottom: 2rem;
  }

  .date-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .date-card {
    background: #ffffff;
    padding: 1rem;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: transform 0.2s ease, background 0.3s ease;
    font-weight: 500;
    color: #b5121b; /* Absa red */
    border-left: 4px solid #b5121b; /* Absa red */
  }

  .date-card:hover {
    transform: translateY(-5px);
    background-color: #fbeaea; /* light Absa red background on hover */
  }

  .loading,
  .error {
    text-align: center;
    font-size: 1.2rem;
    padding: 2rem;
    color: #666;
  }

  .error {
    color: #b5121b; /* Absa red for errors too */
  }
`}</style>

      <div className="payslip-dates">
        <h2>📅 Payslips for {employee?.name || 'Employee'}</h2>
        <div className="date-list">
          {dates.length === 0 ? (
            <p style={{ textAlign: 'center', gridColumn: '1/-1', color: '#777' }}>
              No payslips found for this employee.
            </p>
          ) : (
            dates.map(date => (
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
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default PayslipDates;
