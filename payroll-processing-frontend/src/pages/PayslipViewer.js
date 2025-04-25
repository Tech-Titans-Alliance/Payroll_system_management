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
        const response = await getPayslip(employeeId || employee?.id, paramDate || date);
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
    doc.text("Capaciti Payroll", 14, 15);
    doc.setFontSize(10);
    doc.text("123 Innovation Street, SA", 14, 21);
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
    <div style={styles.wrapper}>
      <h2 style={styles.header}>🧾 Payslip for Employee #{payslip.employeeId}</h2>
      <p style={styles.date}><strong>Pay Date:</strong> {new Date(payslip.payDate).toLocaleDateString()}</p>

      <div style={styles.sectionWrapper}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Earnings</h3>
          <p>Basic Pay: R{payslip.basicPay.toFixed(2)}</p>
          <p>Overtime Pay: R{payslip.overtimePay.toFixed(2)}</p>
          <p>Bonus Pay: R{payslip.bonusPay.toFixed(2)}</p>
          <p><strong>Gross Pay: R{payslip.grossPay.toFixed(2)}</strong></p>
        </div>

        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Deductions</h3>
          <p>Leave Days: {payslip.leaveDays}</p>
          <p>Tax Amount: R{payslip.taxAmount.toFixed(2)}</p>
          <p>Other Deductions: R{payslip.otherDeductions.toFixed(2)}</p>
        </div>
      </div>

      <div style={styles.netPaySection}>
        <h3>Net Pay</h3>
        <p style={styles.netAmount}>💵 R{payslip.netPay.toFixed(2)}</p>
      </div>

      <p style={styles.status}>
        Status: <span style={{
          padding: '2px 10px',
          borderRadius: '12px',
          backgroundColor: payslip.status === 'G' ? '#ffc107' : '#28a745',
          color: '#fff'
        }}>
          {payslip.status === 'G' ? 'Generated' : 'Paid'}
        </span>
      </p>

      <button onClick={downloadPDF} style={styles.button}>
        📥 Download Payslip PDF
      </button>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '30px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#333',
    backgroundColor: '#fdfdfd',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
  },
  header: {
    textAlign: 'center',
    color: '#4e8cff',
    marginBottom: '10px',
  },
  date: {
    textAlign: 'center',
    color: '#555',
    marginBottom: '30px',
  },
  sectionWrapper: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '30px',
  },
  card: {
    flex: '1 1 300px',
    backgroundColor: '#f7f9fc',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
  },
  cardTitle: {
    borderBottom: '1px solid #ccc',
    paddingBottom: '5px',
    marginBottom: '10px',
    color: '#333',
  },
  netPaySection: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  netAmount: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#28a745',
  },
  status: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '16px',
  },
  button: {
    display: 'block',
    margin: '0 auto',
    backgroundColor: '#4e8cff',
    color: '#fff',
    border: 'none',
    padding: '12px 24px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
};

export default PayslipViewer;
