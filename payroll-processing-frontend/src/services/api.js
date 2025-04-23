import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const getEmployees = () => axios.get(`${API_BASE_URL}/employees`);
export const addEmployee = (employeeData) => axios.post(`${API_BASE_URL}/employees`, employeeData);
export const getPayslipDates = (employeeId) => axios.get(`${API_BASE_URL}/employees/${employeeId}/payslips`);
export const getPayslip = (employeeId, date) => axios.get(`${API_BASE_URL}/employees/${employeeId}/payslips/${date}`);
export const processPayroll = (payrollData) => axios.post(`${API_BASE_URL}/process-payroll`, payrollData);
export const getPayrollReport = () => axios.get(`${API_BASE_URL}/payroll-report`);