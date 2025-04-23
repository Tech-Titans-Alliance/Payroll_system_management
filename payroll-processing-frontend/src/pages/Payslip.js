import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Payslip = () => {
  const location = useLocation(); // Get the state passed from SalaryForm
  const payslip = location.state || {}; // Default to empty object if no state is passed

  return (
    <div className="container">
      <Sidebar />
      <div className="main">
        <Header title="Payslip" />
        
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>{payslip.companyName || 'Company Name'}</h2>
          <p>{payslip.companyAddress || 'Company Address'}</p>
          <hr />
          
          <div>
            <p><strong>Employee Name:</strong> {payslip.name} {payslip.surname}</p>
            <p><strong>Employee ID:</strong> {payslip.employeeId}</p>
            <p><strong>Address:</strong> {payslip.address}</p>
            <p><strong>Contact:</strong> {payslip.contact}</p>
          </div>
          
          <h4>Salary Details</h4>
          <div>
            <p><strong>Hours Worked:</strong> {payslip.hours}</p>
            <p><strong>Overtime Hours:</strong> {payslip.overtime}</p>
            <p><strong>Bonus:</strong> {payslip.bonus}</p>
          </div>
          
          <h4>Deductions</h4>
          <div>
            <p><strong>Provident Fund:</strong> {payslip.providentFund}</p>
            <p><strong>Professional Tax:</strong> {payslip.professionalTax}</p>
            <p><strong>Loan:</strong> {payslip.loan}</p>
            <p><strong>Allowance:</strong> {payslip.allowance}</p>
          </div>

          <hr />
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <p><strong>Employer Signature</strong></p>
              <p>(Signature)</p>
            </div>
            <div>
              <p><strong>Employee Signature</strong></p>
              <p>(Signature)</p>
            </div>
          </div>
          
          <p style={{ fontStyle: 'italic' }}>This is a system-generated payslip.</p>
        </div>
      </div>
    </div>
  );
};

export default Payslip;
