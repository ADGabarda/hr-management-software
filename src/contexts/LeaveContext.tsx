import React, { createContext, useContext, useState } from 'react';

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'Vacation' | 'Sick' | 'Maternity' | 'Emergency';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
  approvedBy?: string;
  approvedDate?: string;
  documents?: {
    name: string;
    url: string;
  }[];
}

interface LeaveBalance {
  employeeId: string;
  vacation: number;
  sick: number;
  maternity: number;
  emergency: number;
}

interface LeaveContextType {
  leaveRequests: LeaveRequest[];
  leaveBalances: LeaveBalance[];
  submitLeaveRequest: (request: Omit<LeaveRequest, 'id' | 'appliedDate' | 'status'>) => void;
  approveLeaveRequest: (id: string, approvedBy: string) => void;
  rejectLeaveRequest: (id: string, approvedBy: string) => void;
  getLeaveBalance: (employeeId: string) => LeaveBalance | undefined;
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined);

export const useLeave = () => {
  const context = useContext(LeaveContext);
  if (!context) {
    throw new Error('useLeave must be used within a LeaveProvider');
  }
  return context;
};

export const LeaveProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: '1',
      employeeId: 'EMP003',
      employeeName: 'Roberto Miguel Fernandez',
      type: 'Vacation',
      startDate: '2024-12-25',
      endDate: '2024-12-27',
      days: 3,
      reason: 'Christmas vacation with family',
      status: 'Pending',
      appliedDate: '2024-12-15'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'Maria Santos Rodriguez',
      type: 'Sick',
      startDate: '2024-12-20',
      endDate: '2024-12-20',
      days: 1,
      reason: 'Flu symptoms',
      status: 'Approved',
      appliedDate: '2024-12-19',
      approvedBy: 'EMP001',
      approvedDate: '2024-12-19'
    }
  ]);

  const [leaveBalances, setLeaveBalances] = useState<LeaveBalance[]>([
    {
      employeeId: 'EMP001',
      vacation: 20,
      sick: 15,
      maternity: 0,
      emergency: 5
    },
    {
      employeeId: 'EMP002',
      vacation: 18,
      sick: 14,
      maternity: 105,
      emergency: 5
    },
    {
      employeeId: 'EMP003',
      vacation: 15,
      sick: 15,
      maternity: 0,
      emergency: 5
    }
  ]);

  const submitLeaveRequest = (request: Omit<LeaveRequest, 'id' | 'appliedDate' | 'status'>) => {
    const newRequest: LeaveRequest = {
      ...request,
      id: Date.now().toString(),
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };
    setLeaveRequests(prev => [...prev, newRequest]);
  };

  const approveLeaveRequest = (id: string, approvedBy: string) => {
    setLeaveRequests(prev =>
      prev.map(request =>
        request.id === id
          ? {
              ...request,
              status: 'Approved' as const,
              approvedBy,
              approvedDate: new Date().toISOString().split('T')[0]
            }
          : request
      )
    );

    // Deduct from leave balance
    const request = leaveRequests.find(r => r.id === id);
    if (request) {
      setLeaveBalances(prev =>
        prev.map(balance =>
          balance.employeeId === request.employeeId
            ? {
                ...balance,
                [request.type.toLowerCase()]: Math.max(0, balance[request.type.toLowerCase() as keyof Omit<LeaveBalance, 'employeeId'>] - request.days)
              }
            : balance
        )
      );
    }
  };

  const rejectLeaveRequest = (id: string, approvedBy: string) => {
    setLeaveRequests(prev =>
      prev.map(request =>
        request.id === id
          ? {
              ...request,
              status: 'Rejected' as const,
              approvedBy,
              approvedDate: new Date().toISOString().split('T')[0]
            }
          : request
      )
    );
  };

  const getLeaveBalance = (employeeId: string) => {
    return leaveBalances.find(balance => balance.employeeId === employeeId);
  };

  return (
    <LeaveContext.Provider value={{
      leaveRequests,
      leaveBalances,
      submitLeaveRequest,
      approveLeaveRequest,
      rejectLeaveRequest,
      getLeaveBalance
    }}>
      {children}
    </LeaveContext.Provider>
  );
};