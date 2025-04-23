// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { processPayroll } from '../services/api';

// const PayrollForm = () => {
//   const [formData, setFormData] = useState({
//     employeeId: '',
//     leaveDays: 0,
//     overtimeHours: 0,
//     bonusAmount: 0,
//     payDate: new Date().toISOString().split('T')[0]
//   });
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setLoading(true);
    
//     try {
//       const response = await processPayroll({
//         employeeId: formData.employeeId,
//         leaveDays: parseInt(formData.leaveDays),
//         overtimeHours: parseInt(formData.overtimeHours),
//         bonusAmount: parseFloat(formData.bonusAmount),
//         payDate: formData.payDate
//       });
      
//       setResult(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError(err.response?.data?.error || 'Failed to process payroll');
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="payroll-form">
//       <h2>Process Payroll</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Employee ID:</label>
//           <input
//             type="text"
//             name="employeeId"
//             value={formData.employeeId}
//             onChange={handleChange}
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Leave Days:</label>
//           <input
//             type="number"
//             name="leaveDays"
//             value={formData.leaveDays}
//             onChange={handleChange}
//             min="0"
//             max="30"
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Overtime Hours:</label>
//           <input
//             type="number"
//             name="overtimeHours"
//             value={formData.overtimeHours}
//             onChange={handleChange}
//             min="0"
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Bonus Amount:</label>
//           <input
//             type="number"
//             name="bonusAmount"
//             value={formData.bonusAmount}
//             onChange={handleChange}
//             min="0"
//             step="0.01"
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label>Pay Date:</label>
//           <input
//             type="date"
//             name="payDate"
//             value={formData.payDate}
//             onChange={handleChange}
//             required
//           />
//         </div>
        
//         <button type="submit" disabled={loading}>
//           {loading ? 'Processing...' : 'Process Payroll'}
//         </button>
//       </form>
      
//       {error && <div className="error-message">{error}</div>}
      
//       {result && (
//         <div className="result">
//           <h3>Payroll Result</h3>
//           <p>Net Pay: ${result.netPay.toFixed(2)}</p>
//           <p>{result.message}</p>
//           <button onClick={() => navigate(`/payslip/${formData.employeeId}/${formData.payDate}`)}>
//             View Payslip
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PayrollForm;
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
      [name]: name === 'employeeId' ? value : 
             (name === 'payDate' ? value : Number(value))
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      const response = await processPayroll({
        employeeId: formData.employeeId,
        leaveDays: formData.leaveDays,
        overtimeHours: formData.overtimeHours,
        bonusAmount: formData.bonusAmount,
        payDate: formData.payDate
      });
      
      setResult({
        netPay: response.data.netPay || 0,
        message: response.data.message || 'Payroll processed successfully'
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process payroll');
      setResult({ netPay: 0, message: '' });
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return (value || 0).toFixed(2);
  };

  return (
    <div className="payroll-form">
      <h2>Process Payroll</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Employee ID:</label>
          <input
            type="text"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Leave Days:</label>
          <input
            type="number"
            name="leaveDays"
            value={formData.leaveDays}
            onChange={handleChange}
            min="0"
            max="30"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Overtime Hours:</label>
          <input
            type="number"
            name="overtimeHours"
            value={formData.overtimeHours}
            onChange={handleChange}
            min="0"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Bonus Amount:</label>
          <input
            type="number"
            name="bonusAmount"
            value={formData.bonusAmount}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Pay Date:</label>
          <input
            type="date"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Process Payroll'}
        </button>
      </form>
      
      {error && <div className="error-message">{error}</div>}
      
      <div className="result">
        <h3>Payroll Result</h3>
        <p>Net Pay: ${formatCurrency(result.netPay)}</p>
        <p>{result.message}</p>
        {result.netPay > 0 && (
          <button onClick={() => navigate(`/payslip/${formData.employeeId}/${formData.payDate}`)}>
            View Payslip
          </button>
        )}
      </div>
    </div>
  );
};

export default PayrollForm;