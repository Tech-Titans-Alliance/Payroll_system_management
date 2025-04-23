import React, { useState, useEffect } from 'react';
import { getPayrollReport } from '../services/api';

const PayrollReport = () => {
  const [report, setReport] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getPayrollReport();
        setReport(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <div className="loading">Generating report...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="payroll-report">
      <h2>Payroll Report</h2>
      <div className="report-content">
        <pre>{report}</pre>
      </div>
    </div>
  );
};

export default PayrollReport;