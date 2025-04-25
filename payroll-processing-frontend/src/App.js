import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import PayslipDates from './pages/PayslipDates';
import PayslipViewer from './pages/PayslipViewer';
import PayrollForm from './pages/PayrollForm';
import PayrollReport from './pages/PayrollReport';
import DashboardLayout from './layouts/DashboardLayout';
import './App.css';

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Layout Route */}
        <Route path="/" element={<DashboardLayout />}>
          {/* These routes will render inside the DashboardLayout */}
          <Route index element={<Dashboard />} />
          <Route
            path="dashboard"
            element={<Dashboard />}
          />
          <Route
            path="employees"
            element={<EmployeeList onSelectEmployee={setSelectedEmployee} />}
          />
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
            element={
              <PayslipViewer
                employee={selectedEmployee}
                date={selectedDate}
              />
            }
          />
          <Route path="process-payroll" element={<PayrollForm />} />
          <Route path="payroll-report" element={<PayrollReport />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

