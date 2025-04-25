import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import PayslipDates from './pages/PayslipDates';
import PayslipViewer from './pages/PayslipViewer';
import PayrollForm from './pages/PayrollForm';
import PayrollReport from './pages/PayrollReport';
import DashboardLayout from './layouts/DashboardLayout';
import LoginPage from './pages/Login';

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true); // Update state after successful login
  };

  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={isAuthenticated ? <DashboardLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<EmployeeList onSelectEmployee={setSelectedEmployee} />} />
          <Route
            path="payslips/:employeeId"
            element={
              <PayslipDates
                employee={selectedEmployee}
                onSelectDate={setSelectedDate}
              />
            }
          />
          <Route
            path="payslip/:employeeId/:date"
            element={<PayslipViewer employee={selectedEmployee} date={selectedDate} />}
          />
          <Route path="process-payroll" element={<PayrollForm />} />
          <Route path="payroll-report" element={<PayrollReport />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
