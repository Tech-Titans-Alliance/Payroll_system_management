import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const SalaryForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    surname: '',
    employeeId: '',
    address: '',
    contact: '',
    hours: '',
    overtime: '',
    bonus: '',
    providentFund: '',
    professionalTax: '',
    loan: '',
    allowance: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const hours = parseFloat(form.hours) || 0;
    const overtime = parseFloat(form.overtime) || 0;
    const bonus = parseFloat(form.bonus) || 0;
    const allowance = parseFloat(form.allowance) || 0;

    const hourlyRate = 100;
    const overtimeRate = 150;

    const basicPay = hours * hourlyRate;
    const overtimePay = overtime * overtimeRate;

    const grossSalary = basicPay + overtimePay + bonus + allowance;

    const providentFund =
      form.providentFund !== ''
        ? parseFloat(form.providentFund)
        : grossSalary * 0.1;

    const professionalTax =
      form.professionalTax !== ''
        ? parseFloat(form.professionalTax)
        : grossSalary * 0.02;

    const loan = parseFloat(form.loan) || 0;

    const totalDeductions = providentFund + professionalTax + loan;
    const netSalary = grossSalary - totalDeductions;

    navigate('/payslip', {
      state: {
        ...form,
        basicPay,
        overtimePay,
        grossSalary,
        providentFund,
        professionalTax,
        loan,
        totalDeductions,
        netSalary,
      },
    });
  };

  return (
    <div className="container" style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main" style={{ flex: 1, padding: '40px' }}>
        <Header title="Salary Calculation 💼" />
        <form onSubmit={handleSubmit} style={styles.form}>
          {[
            { label: 'Employee Name', name: 'name' },
            { label: 'Surname', name: 'surname' },
            { label: 'Employee ID', name: 'employeeId' },
            { label: 'Address', name: 'address' },
            { label: 'Contact', name: 'contact' },
            { label: 'Hours Worked', name: 'hours' },
            { label: 'Overtime Hours', name: 'overtime' },
            { label: 'Bonus', name: 'bonus' },
            { label: 'Provident Fund (leave blank = 10%)', name: 'providentFund' },
            { label: 'Professional Tax (leave blank = 2%)', name: 'professionalTax' },
            { label: 'Loan', name: 'loan' },
            { label: 'Allowance', name: 'allowance' }
          ].map(({ label, name }) => (
            <div key={name} style={styles.inputGroup}>
              <label style={styles.label}>{label}</label>
              <input
                type="text"
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={`Enter ${label.toLowerCase()}`}
                style={styles.input}
              />
            </div>
          ))}

          <div style={{ textAlign: 'center', gridColumn: '1 / -1' }}>
            <button type="submit" style={styles.button}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  form: {
    maxWidth: '700px',
    margin: 'auto',
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    fontWeight: '500'
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '13px'
  },
  button: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#f06273',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default SalaryForm;
