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
          {/* Company Info */}
          <h2>{payslip.companyName || 'Company Name'}</h2>
          <p>{payslip.companyAddress || 'Company Address'}</p>
          <hr />

          {/* Employee Info */}
          <div>
            <p><strong>Employee Name:</strong> {payslip.name} {payslip.surname}</p>
            <p><strong>Employee ID:</strong> {payslip.employeeId}</p>
            <p><strong>Address:</strong> {payslip.address}</p>
            <p><strong>Contact:</strong> {payslip.contact}</p>
          </div>

          {/* Salary Details */}
          <h4>Salary Details</h4>
          <div>
            <p><strong>Hours Worked:</strong> {payslip.hours || 'N/A'}</p>
            <p><strong>Overtime Hours:</strong> {payslip.overtime || 'N/A'}</p>
            <p><strong>Bonus:</strong> {payslip.bonus || 'N/A'}</p>
          </div>

          {/* Deductions */}
          <h4>Deductions</h4>
          <div>
            <p><strong>Provident Fund:</strong> {payslip.providentFund || 'N/A'}</p>
            <p><strong>Professional Tax:</strong> {payslip.professionalTax || 'N/A'}</p>
            <p><strong>Loan:</strong> {payslip.loan || 'N/A'}</p>
            <p><strong>Allowance:</strong> {payslip.allowance || 'N/A'}</p>
          </div>

          <hr />

          {/* Signatures */}
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

          {/* Footer */}
          <p style={{ fontStyle: 'italic' }}>This is a system-generated payslip.</p>
        </div>
      </div>
    </div>
  );
};

export default Payslip;
