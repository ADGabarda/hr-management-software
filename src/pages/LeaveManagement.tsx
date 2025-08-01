import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLeave } from '../contexts/LeaveContext';
import { 
  Calendar, 
  Plus, 
  Clock, 
  CheckCircle, 
  XCircle,
  Filter,
  Search,
  FileText,
  User,
  CalendarDays
} from 'lucide-react';

const LeaveManagement: React.FC = () => {
  const { user } = useAuth();
  const { leaveRequests, leaveBalances, submitLeaveRequest, approveLeaveRequest, rejectLeaveRequest, getLeaveBalance } = useLeave();
  const [activeTab, setActiveTab] = useState<'requests' | 'balance' | 'apply'>('requests');
  const [statusFilter, setStatusFilter] = useState('all');

  const isAdmin = user?.role && ['President/CEO', 'Vice President', 'IT Head', 'HR', 'Admin'].includes(user.role);
  
  const userLeaveRequests = isAdmin 
    ? leaveRequests 
    : leaveRequests.filter(req => req.employeeId === user?.employeeId);

  const filteredRequests = userLeaveRequests.filter(request => 
    statusFilter === 'all' || request.status === statusFilter
  );

  const userBalance = getLeaveBalance(user?.employeeId || '');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'status-active';
      case 'Rejected': return 'status-inactive';
      default: return 'status-pending';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leave Management</h1>
          <p className="text-gray-600">Manage leave requests and balances</p>
        </div>
        <button 
          onClick={() => setActiveTab('apply')}
          className="btn-primary flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Apply for Leave
        </button>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid mb-8">
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{userLeaveRequests.length}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {userLeaveRequests.filter(req => req.status === 'Pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {userLeaveRequests.filter(req => req.status === 'Approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CalendarDays className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Leave Balance</p>
              <p className="text-2xl font-bold text-gray-900">{userBalance?.vacation || 0}</p>
              <p className="text-xs text-gray-500">Vacation days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'requests', name: 'Leave Requests', icon: FileText },
              { id: 'balance', name: 'Leave Balance', icon: Calendar },
              { id: 'apply', name: 'Apply for Leave', icon: Plus }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="card-body">
          {/* Leave Requests Tab */}
          {activeTab === 'requests' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isAdmin ? 'All Leave Requests' : 'My Leave Requests'}
                </h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-input"
                  >
                    <option value="all">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{request.type} Leave</h3>
                          <span className={`${getStatusColor(request.status)} text-xs`}>
                            {request.status}
                          </span>
                        </div>
                        
                        {isAdmin && (
                          <p className="text-sm text-gray-600 mb-2">
                            <User className="w-4 h-4 inline mr-1" />
                            {request.employeeName} ({request.employeeId})
                          </p>
                        )}
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600">
                              <strong>Start Date:</strong> {new Date(request.startDate).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>End Date:</strong> {new Date(request.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              <strong>Duration:</strong> {request.days} day(s)
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Applied:</strong> {new Date(request.appliedDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3">
                          <strong>Reason:</strong> {request.reason}
                        </p>
                        
                        {request.approvedBy && (
                          <p className="text-xs text-gray-500">
                            {request.status} by {request.approvedBy} on {request.approvedDate && new Date(request.approvedDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {getStatusIcon(request.status)}
                        {isAdmin && request.status === 'Pending' && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => approveLeaveRequest(request.id, user?.employeeId || '')}
                              className="btn-success text-sm px-3 py-1"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => rejectLeaveRequest(request.id, user?.employeeId || '')}
                              className="btn-danger text-sm px-3 py-1"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredRequests.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No leave requests found</h3>
                  <p className="text-gray-600">No requests match your current filter criteria.</p>
                </div>
              )}
            </div>
          )}

          {/* Leave Balance Tab */}
          {activeTab === 'balance' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Leave Balance</h2>
              
              {userBalance && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { type: 'Vacation', balance: userBalance.vacation, color: 'blue' },
                    { type: 'Sick', balance: userBalance.sick, color: 'green' },
                    { type: 'Maternity', balance: userBalance.maternity, color: 'purple' },
                    { type: 'Emergency', balance: userBalance.emergency, color: 'red' }
                  ].map((leave) => (
                    <div key={leave.type} className="card">
                      <div className="card-body text-center">
                        <div className={`w-16 h-16 bg-${leave.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                          <Calendar className={`w-8 h-8 text-${leave.color}-600`} />
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-2">{leave.type} Leave</h3>
                        <p className="text-3xl font-bold text-gray-900 mb-1">{leave.balance}</p>
                        <p className="text-sm text-gray-600">days remaining</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Apply for Leave Tab */}
          {activeTab === 'apply' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Apply for Leave</h2>
              
              <form className="max-w-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Leave Type</label>
                    <select className="form-input">
                      <option value="">Select leave type</option>
                      <option value="Vacation">Vacation Leave</option>
                      <option value="Sick">Sick Leave</option>
                      <option value="Maternity">Maternity Leave</option>
                      <option value="Emergency">Emergency Leave</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="form-label">Duration</label>
                    <input type="number" className="form-input" placeholder="Number of days" min="1" />
                  </div>
                  
                  <div>
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  
                  <div>
                    <label className="form-label">End Date</label>
                    <input type="date" className="form-input" />
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="form-label">Reason</label>
                  <textarea 
                    className="form-input" 
                    rows={4} 
                    placeholder="Please provide a reason for your leave request..."
                  ></textarea>
                </div>
                
                <div className="mt-6">
                  <label className="form-label">Supporting Documents (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <button type="submit" className="btn-primary">
                    Submit Application
                  </button>
                  <button type="button" className="btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeaveManagement;