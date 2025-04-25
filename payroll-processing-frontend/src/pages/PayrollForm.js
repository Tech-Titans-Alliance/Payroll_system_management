import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { processPayroll } from '../services/api';

const PayrollForm = () => {
  const [formData, setFormData] = useState({
    employeeId: '',
    leaveDays: 0,
    overtimeHours: 0,
    bonusAmount: 0,
    payDate: new Date().toISOString().split('T')[0]
  });

  const [result, setResult] = useState({ netPay: 0, message: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'employeeId' || name === 'payDate' ? value : Number(value)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await processPayroll(formData);
      setResult({
        netPay: response.data.netPay || 0,
        message: response.data.message || 'Payroll processed successfully 💼'
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process payroll 😞');
      setResult({ netPay: 0, message: '' });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return (value || 0).toFixed(2);
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.header}>Process Payroll</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>🆔 Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>🏖️ Leave Days:</label>
          <input
            type="number"
            name="leaveDays"
            value={formData.leaveDays}
            onChange={handleChange}
            min="0"
            max="30"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>⏰ Overtime Hours:</label>
          <input
            type="number"
            name="overtimeHours"
            value={formData.overtimeHours}
            onChange={handleChange}
            min="0"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>💵 Bonus Amount:</label>
          <input
            type="number"
            name="bonusAmount"
            value={formData.bonusAmount}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>📅 Pay Date:</label>
          <input
            type="date"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={loading ? { ...styles.submitButton, ...styles.submitButtonDisabled } : styles.submitButton}
        >
          {loading ? 'Processing... ⏳' : 'Process Payroll'}
        </button>
      </form>

      {error && <div style={styles.errorMessage}>{error}</div>}

      {/* <div style={styles.result}>
        <h3 style={styles.resultHeader}>Payroll Result</h3>
        <p>💸 Net Pay: ${formatCurrency(result.netPay)}</p>
        <p>{result.message}</p>
        {result.netPay > 0 && (
          <button
            onClick={() => navigate(`/payslip/${formData.employeeId}/${formData.payDate}`)}
            style={styles.viewPayslipButton}
          >
            👀 View Payslip
          </button>
        )}
      </div> */}
    </div>
  );
};

const styles = {
  formContainer: {
    maxWidth: '450px',
    width: '100%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor:'#c4beb6',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    fontSize: '22px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    fontSize: '14px',
    marginBottom: '6px',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  submitButton: {
    padding: '10px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: 'rgba(22, 163, 74, 0.8)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  submitButtonDisabled: {
    backgroundColor: '#A9A9A9',
  },
  errorMessage: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
    fontSize: '14px',
  },
  result: {
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#e7f7e7',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
    fontSize: '14px',
  },
  resultHeader: {
    fontSize: '16px',
    marginBottom: '10px',
    color: '#333',
    fontWeight: 'bold',
  },
  viewPayslipButton: {
    padding: '10px 15px',
    backgroundColor: '#28a745',
    color: '#fff',
    fontSize: '14px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default PayrollForm;