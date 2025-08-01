import React, { createContext, useContext, useState } from 'react';

interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  period: string;
  basicPay: number;
  overtime: number;
  allowances: number;
  commissions: number;
  incentives: number;
  grossPay: number;
  deductions: {
    sss: number;
    philHealth: number;
    pagIbig: number;
    tax: number;
    loans: number;
  };
  netPay: number;
  payDate: string;
  status: 'Pending' | 'Processed' | 'Paid';
}

interface PayrollContextType {
  payrollRecords: PayrollRecord[];
  generatePayroll: (employeeId: string, period: string) => void;
  processPayroll: (id: string) => void;
  getPayrollHistory: (employeeId: string) => PayrollRecord[];
}

const PayrollContext = createContext<PayrollContextType | undefined>(undefined);

export const usePayroll = () => {
  const context = useContext(PayrollContext);
  if (!context) {
    throw new Error('usePayroll must be used within a PayrollProvider');
  }
  return context;
};

export const PayrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [payrollRecords, setPayrollRecords] = useState<PayrollRecord[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'Juan Carlos Dela Cruz',
      period: 'December 1-15, 2024',
      basicPay: 75000,
      overtime: 5000,
      allowances: 10000,
      commissions: 15000,
      incentives: 5000,
      grossPay: 110000,
      deductions: {
        sss: 2475,
        philHealth: 1375,
        pagIbig: 100,
        tax: 18500,
        loans: 0
      },
      netPay: 87550,
      payDate: '2024-12-15',
      status: 'Paid'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Maria Santos Rodriguez',
      period: 'December 1-15, 2024',
      basicPay: 40000,
      overtime: 2000,
      allowances: 5000,
      commissions: 0,
      incentives: 2000,
      grossPay: 49000,
      deductions: {
        sss: 1760,
        philHealth: 1225,
        pagIbig: 100,
        tax: 6500,
        loans: 0
      },
      netPay: 39415,
      payDate: '2024-12-15',
      status: 'Paid'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'Roberto Miguel Fernandez',
      period: 'December 1-15, 2024',
      basicPay: 25000,
      overtime: 1500,
      allowances: 3000,
      commissions: 8000,
      incentives: 1000,
      grossPay: 38500,
      deductions: {
        sss: 1560,
        philHealth: 962.5,
        pagIbig: 100,
        tax: 4200,
        loans: 0
      },
      netPay: 31677.5,
      payDate: '2024-12-15',
      status: 'Paid'
    }
  ]);

  const generatePayroll = (employeeId: string, period: string) => {
    // This would typically calculate based on attendance, salary, etc.
    // For demo purposes, we'll create a sample record
    const newRecord: PayrollRecord = {
      id: Date.now().toString(),
      employeeId,
      employeeName: 'Employee Name', // Would be fetched from employee data
      period,
      basicPay: 30000,
      overtime: 2000,
      allowances: 3000,
      commissions: 5000,
      incentives: 1000,
      grossPay: 41000,
      deductions: {
        sss: 1665,
        philHealth: 1025,
        pagIbig: 100,
        tax: 5500,
        loans: 0
      },
      netPay: 32710,
      payDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    setPayrollRecords(prev => [...prev, newRecord]);
  };

  const processPayroll = (id: string) => {
    setPayrollRecords(prev =>
      prev.map(record =>
        record.id === id
          ? { ...record, status: 'Processed' as const }
          : record
      )
    );
  };

  const getPayrollHistory = (employeeId: string) => {
    return payrollRecords.filter(record => record.employeeId === employeeId);
  };

  return (
    <PayrollContext.Provider value={{
      payrollRecords,
      generatePayroll,
      processPayroll,
      getPayrollHistory
    }}>
      {children}
    </PayrollContext.Provider>
  );
};