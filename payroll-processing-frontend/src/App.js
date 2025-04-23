
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EmployeeList from './pages/EmployeeList';
import PayslipDates from './pages/PayslipDates';
import PayslipViewer from './pages/PayslipViewer';
import PayrollForm from './pages/PayrollForm';
import PayrollReport from './pages/PayrollReport';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <Router>
      <div className="App">
        <Sidebar />
        <div className="container">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/employees"
              element={<EmployeeList onSelectEmployee={setSelectedEmployee} />}
            />
            <Route
              path="/payslips/:employeeId"
              element={
                <PayslipDates
                  employee={selectedEmployee}
                  onSelectDate={setSelectedDate}
                />
              }
            />
            <Route
              path="/payslip/:employeeId/:date"
              element={
                <PayslipViewer
                  employee={selectedEmployee}
                  date={selectedDate}
                />
              }
            />
            <Route path="/process-payroll" element={<PayrollForm />} />
            <Route path="/payroll-report" element={<PayrollReport />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
