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
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text("TechTitans Payroll", 105, 15, { align: 'center' });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("19 Ameshoff, Johanneburg. South Africa", 105, 22, { align: 'center' });

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("PAYSLIP", 105, 32, { align: 'center' });

    const tableBody = [
      ['Employee ID', payslip.employeeId],
      ['Pay Date', new Date(payslip.payDate).toLocaleDateString()],
      [{ content: 'EARNINGS', colSpan: 2, styles: { fontStyle: 'bold', halign: 'center', fillColor: [230, 247, 255] } }],
      ['Basic Pay', `R${payslip.basicPay.toFixed(2)}`],
      ['Overtime Pay', `R${payslip.overtimePay.toFixed(2)}`],
      ['Bonus Pay', `R${payslip.bonusPay.toFixed(2)}`],
      ['Gross Pay', `R${payslip.grossPay.toFixed(2)}`],
      [{ content: 'DEDUCTIONS', colSpan: 2, styles: { fontStyle: 'bold', halign: 'center', fillColor: [255, 235, 238] } }],
      ['Leave Days', payslip.leaveDays],
      ['Tax Amount', `R${payslip.taxAmount.toFixed(2)}`],
      ['Other Deductions', `R${payslip.otherDeductions.toFixed(2)}`],
      [{ content: 'Net Pay', styles: { fontStyle: 'bold', textColor: [0, 100, 0] } }, { content: `R${payslip.netPay.toFixed(2)}`, styles: { fontStyle: 'bold', textColor: [0, 100, 0] } }],
      ['Status', payslip.status === 'G' ? 'Generated' : 'Paid'],
    ];

    autoTable(doc, {
      startY: 40,
      head: [['Field', 'Value']],
      body: tableBody,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      margin: { top: 10 },
    });

    doc.save(`Payslip_${payslip.employeeId}_${payslip.payDate}.pdf`);
  };

  if (loading) return <div style={styles.loading}>Loading payslip...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;
  if (!payslip) return <div style={styles.error}>No payslip data available</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2>🧾 Employee Payslip</h2>
          <p style={styles.subText}>
            Employee ID: {payslip.employeeId} | Date: {new Date(payslip.payDate).toLocaleDateString()}
          </p>
        </div>

        <div style={styles.content}>
          <div style={styles.column}>
            <h3 style={styles.sectionTitle}>Earnings</h3>
            <p>💼 Basic Pay: <strong>R{payslip.basicPay.toFixed(2)}</strong></p>
            <p>⏱️ Overtime: <strong>R{payslip.overtimePay.toFixed(2)}</strong></p>
            <p>🎁 Bonus: <strong>R{payslip.bonusPay.toFixed(2)}</strong></p>
            <hr />
            <p><strong>🧮 Gross Pay: R{payslip.grossPay.toFixed(2)}</strong></p>
          </div>

          <div style={styles.column}>
            <h3 style={styles.sectionTitle}>Deductions</h3>
            <p>🌴 Leave Days: <strong>{payslip.leaveDays}</strong></p>
            <p>📉 Tax: <strong>R{payslip.taxAmount.toFixed(2)}</strong></p>
            <p>⚠️ Others: <strong>R{payslip.otherDeductions.toFixed(2)}</strong></p>
          </div>
        </div>

        <div style={styles.netSection}>
          <h3 style={styles.netTitle}>💰 Net Pay</h3>
          <p style={styles.netAmount}>R{payslip.netPay.toFixed(2)}</p>
        </div>

        <div style={styles.statusWrapper}>
          <span style={{
            ...styles.status,
            backgroundColor: payslip.status === 'G' ? '#f0ad4e' : '#5cb85c'
          }}>
            {payslip.status === 'G' ? '📝 Generated' : '✅ Paid'}
          </span>
        </div>

        <button style={styles.button} onClick={downloadPDF}>
          📄 Download PDF
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#eef2f7',
    minHeight: '100vh',
    padding: '40px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    padding: '35px',
    maxWidth: '900px',
    width: '100%',
    boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '25px',
    borderBottom: '2px dashed #ccc',
    paddingBottom: '10px',
  },
  subText: {
    fontSize: '14px',
    color: '#666',
  },
  content: {
    display: 'flex',
    gap: '30px',
    marginBottom: '30px',
  },
  column: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.03)',
  },
  sectionTitle: {
    marginBottom: '10px',
    fontSize: '17px',
    color: '#007bff',
    borderBottom: '1px solid #ddd',
    paddingBottom: '4px',
  },
  netSection: {
    textAlign: 'center',
    marginBottom: '25px',
  },
  netTitle: {
    fontSize: '22px',
    color: '#333',
  },
  netAmount: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: '8px',
  },
  statusWrapper: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  status: {
    padding: '10px 20px',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    display: 'inline-block',
  },
  button: {
    display: 'block',
    margin: '0 auto',
    padding: '14px 30px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '16px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    padding: '40px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    padding: '20px',
  },
};

export default PayslipViewer;