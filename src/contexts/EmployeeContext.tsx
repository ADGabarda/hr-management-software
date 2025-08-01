import React, { createContext, useContext, useState } from 'react';

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  address: string;
  birthdate: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    address: string;
  };
  employmentType: 'Regular' | 'Probationary' | 'Contractual' | 'Part-time';
  status: 'Active' | 'Inactive' | 'On Leave';
  hireDate: string;
  salary: number;
  documents: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    url: string;
  }[];
}

interface EmployeeContextType {
  employees: Employee[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, updates: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  getEmployee: (id: string) => Employee | undefined;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployee must be used within an EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'Juan Carlos Dela Cruz',
      role: 'President/CEO',
      department: 'Executive',
      email: 'juan.delacruz@afflatus.com',
      phone: '+63 917 123 4567',
      address: '123 Makati Ave, Makati City, Metro Manila',
      birthdate: '1980-05-15',
      emergencyContact: {
        name: 'Maria Dela Cruz',
        relationship: 'Spouse',
        phone: '+63 917 765 4321',
        address: '123 Makati Ave, Makati City, Metro Manila'
      },
      employmentType: 'Regular',
      status: 'Active',
      hireDate: '2020-01-15',
      salary: 150000,
      documents: []
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'Maria Santos Rodriguez',
      role: 'HR',
      department: 'Human Resources',
      email: 'maria.santos@afflatus.com',
      phone: '+63 917 234 5678',
      address: '456 BGC Blvd, Taguig City, Metro Manila',
      birthdate: '1985-08-22',
      emergencyContact: {
        name: 'Jose Rodriguez',
        relationship: 'Spouse',
        phone: '+63 917 876 5432',
        address: '456 BGC Blvd, Taguig City, Metro Manila'
      },
      employmentType: 'Regular',
      status: 'Active',
      hireDate: '2020-03-01',
      salary: 80000,
      documents: []
    }
  ]);

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee = {
      ...employee,
      id: Date.now().toString()
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => 
      prev.map(emp => emp.id === id ? { ...emp, ...updates } : emp)
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const getEmployee = (id: string) => {
    return employees.find(emp => emp.id === id);
  };

  return (
    <EmployeeContext.Provider value={{
      employees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
      getEmployee
    }}>
      {children}
    </EmployeeContext.Provider>
  );
};