import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EmployeeProvider } from './contexts/EmployeeContext';
import { LeaveProvider } from './contexts/LeaveContext';
import { PayrollProvider } from './contexts/PayrollContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserManagement from './pages/UserManagement';
import Employees from './pages/Employees';
import LeaveManagement from './pages/LeaveManagement';
import Payroll from './pages/Payroll';
import Performance from './pages/Performance';
import Recruitment from './pages/Recruitment';
import Training from './pages/Training';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <EmployeeProvider>
        <LeaveProvider>
          <PayrollProvider>
            <Router>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/user-management" element={
                    <ProtectedRoute requiredRoles={['Master Admin']}>
                      <UserManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/employees" element={
                    <ProtectedRoute requiredRoles={['Master Admin', 'President/CEO', 'Vice President', 'IT Head', 'HR', 'Admin']}>
                      <Employees />
                    </ProtectedRoute>
                  } />
                  <Route path="/leave" element={
                    <ProtectedRoute>
                      <LeaveManagement />
                    </ProtectedRoute>
                  } />
                  <Route path="/payroll" element={
                    <ProtectedRoute requiredRoles={['Master Admin', 'President/CEO', 'Vice President', 'IT Head', 'HR', 'Admin']}>
                      <Payroll />
                    </ProtectedRoute>
                  } />
                  <Route path="/performance" element={
                    <ProtectedRoute>
                      <Performance />
                    </ProtectedRoute>
                  } />
                  <Route path="/recruitment" element={
                    <ProtectedRoute requiredRoles={['Master Admin', 'President/CEO', 'Vice President', 'IT Head', 'HR', 'Admin']}>
                      <Recruitment />
                    </ProtectedRoute>
                  } />
                  <Route path="/training" element={
                    <ProtectedRoute>
                      <Training />
                    </ProtectedRoute>
                  } />
                  <Route path="/reports" element={
                    <ProtectedRoute requiredRoles={['Master Admin', 'President/CEO', 'Vice President', 'IT Head', 'HR', 'Admin']}>
                      <Reports />
                    </ProtectedRoute>
                  } />
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute requiredRoles={['Master Admin', 'President/CEO', 'Vice President', 'IT Head', 'HR', 'Admin']}>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Layout>
            </Router>
          </PayrollProvider>
        </LeaveProvider>
      </EmployeeProvider>
    </AuthProvider>
  );
}

export default App;