import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPayslip } from '../services/api';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PayslipViewer = ({ employee, date }) => {
  const { employeeId, date: paramDate } = useParams();
  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayslip = async () => {
      try {
        const response = await getPayslip(
          employeeId || employee?.id,
          paramDate || date
        );
        setPayslip(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPayslip();
  }, [employeeId, employee, paramDate, date]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Company Name", 14, 15);
    doc.setFontSize(10);
    doc.text("Company Address", 14, 21);
    doc.text("Payslip", 90, 30);

    autoTable(doc, {
      startY: 35,
      head: [['Field', 'Value']],
      body: [
        ['Employee ID', payslip.employeeId],
        ['Pay Date', new Date(payslip.payDate).toLocaleDateString()],
        ['Basic Pay', `R${payslip.basicPay.toFixed(2)}`],
        ['Overtime Pay', `R${payslip.overtimePay.toFixed(2)}`],
        ['Bonus Pay', `R${payslip.bonusPay.toFixed(2)}`],
        ['Gross Pay', `R${payslip.grossPay.toFixed(2)}`],
        ['Leave Days', payslip.leaveDays],
        ['Tax Amount', `R${payslip.taxAmount.toFixed(2)}`],
        ['Other Deductions', `R${payslip.otherDeductions.toFixed(2)}`],
        ['Net Pay', `R${payslip.netPay.toFixed(2)}`],
        ['Status', payslip.status === 'G' ? 'Generated' : 'Paid'],
      ]
    });

    doc.save(`Payslip_${payslip.employeeId}_${payslip.payDate}.pdf`);
  };

  if (loading) return <div className="loading">Loading payslip...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!payslip) return <div>No payslip data available</div>;

  return (
    <div className="payslip-viewer" style={{ padding: '20px' }}>
      <h2>Payslip for Employee ID: {payslip.employeeId}</h2>
      <p><strong>Pay Date:</strong> {new Date(payslip.payDate).toLocaleDateString()}</p>

      <div className="payslip-details" style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
        <div className="earnings">
          <h3>Earnings</h3>
          <p>Basic Pay: R{payslip.basicPay?.toFixed(2)}</p>
          <p>Overtime Pay: R{payslip.overtimePay?.toFixed(2)}</p>
          <p>Bonus Pay: R{payslip.bonusPay?.toFixed(2)}</p>
          <p><strong>Gross Pay: R{payslip.grossPay?.toFixed(2)}</strong></p>
        </div>

        <div className="deductions">
          <h3>Deductions</h3>
          <p>Leave Days: {payslip.leaveDays}</p>
          <p>Tax Amount: R{payslip.taxAmount?.toFixed(2)}</p>
          <p>Other Deductions: R{payslip.otherDeductions?.toFixed(2)}</p>
        </div>
      </div>

      <div className="net-pay" style={{ marginTop: '20px' }}>
        <h3>Net Pay</h3>
        <p><strong>R{payslip.netPay?.toFixed(2)}</strong></p>
      </div>

      <p>Status: {payslip.status === 'G' ? 'Generated' : 'Paid'}</p>

      <button onClick={downloadPDF} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Download Payslip PDF
      </button>
    </div>
  );
};

export default PayslipViewer;
