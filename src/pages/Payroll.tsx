import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePayroll } from '../contexts/PayrollContext';
import { 
  DollarSign, 
  Download, 
  Eye, 
  Filter,
  Calendar,
  TrendingUp,
  FileText,
  CreditCard,
  Calculator
} from 'lucide-react';

const Payroll: React.FC = () => {
  const { user } = useAuth();
  const { payrollRecords, getPayrollHistory } = usePayroll();
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [activeTab, setActiveTab] = useState<'records' | 'generate'>('records');

  const isAdmin = user?.role && ['President/CEO', 'Vice President', 'IT Head', 'HR', 'Admin'].includes(user.role);
  
  const userPayrollRecords = isAdmin 
    ? payrollRecords 
    : getPayrollHistory(user?.employeeId || '');

  const filteredRecords = userPayrollRecords.filter(record => 
    selectedPeriod === 'all' || record.period.includes(selectedPeriod)
  );

  const totalNetPay = filteredRecords.reduce((sum, record) => sum + record.netPay, 0);
  const totalGrossPay = filteredRecords.reduce((sum, record) => sum + record.grossPay, 0);
  const totalDeductions = filteredRecords.reduce((sum, record) => 
    sum + Object.values(record.deductions).reduce((deductionSum, deduction) => deductionSum + deduction, 0), 0
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'status-active';
      case 'Processed': return 'status-pending';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payroll Management</h1>
          <p className="text-gray-600">Manage payroll records and generate payslips</p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setActiveTab('generate')}
            className="btn-primary flex items-center"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Generate Payroll
          </button>
        )}
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid mb-8">
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Net Pay</p>
              <p className="text-2xl font-bold text-gray-900">₱{totalNetPay.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Gross Pay</p>
              <p className="text-2xl font-bold text-gray-900">₱{totalGrossPay.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-red-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Deductions</p>
              <p className="text-2xl font-bold text-gray-900">₱{totalDeductions.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Payroll Records</p>
              <p className="text-2xl font-bold text-gray-900">{filteredRecords.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'records', name: 'Payroll Records', icon: FileText },
              ...(isAdmin ? [{ id: 'generate', name: 'Generate Payroll', icon: Calculator }] : [])
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
          {/* Payroll Records Tab */}
          {activeTab === 'records' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {isAdmin ? 'All Payroll Records' : 'My Payroll Records'}
                </h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="form-input"
                  >
                    <option value="all">All Periods</option>
                    <option value="December 2024">December 2024</option>
                    <option value="November 2024">November 2024</option>
                    <option value="October 2024">October 2024</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {filteredRecords.map((record) => (
                  <div key={record.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{record.employeeName}</h3>
                          <span className="text-sm text-gray-600">({record.employeeId})</span>
                          <span className={`${getStatusColor(record.status)} text-xs`}>
                            {record.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          {record.period} • Pay Date: {new Date(record.payDate).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Earnings */}
                      <div className="bg-green-50 rounded-lg p-4">
                        <h4 className="font-medium text-green-800 mb-3">Earnings</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Basic Pay:</span>
                            <span className="font-medium">₱{record.basicPay.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Overtime:</span>
                            <span className="font-medium">₱{record.overtime.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Allowances:</span>
                            <span className="font-medium">₱{record.allowances.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Commissions:</span>
                            <span className="font-medium">₱{record.commissions.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Incentives:</span>
                            <span className="font-medium">₱{record.incentives.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t border-green-200 pt-2 font-semibold">
                            <span>Gross Pay:</span>
                            <span>₱{record.grossPay.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Deductions */}
                      <div className="bg-red-50 rounded-lg p-4">
                        <h4 className="font-medium text-red-800 mb-3">Deductions</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">SSS:</span>
                            <span className="font-medium">₱{record.deductions.sss.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">PhilHealth:</span>
                            <span className="font-medium">₱{record.deductions.philHealth.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Pag-IBIG:</span>
                            <span className="font-medium">₱{record.deductions.pagIbig.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tax:</span>
                            <span className="font-medium">₱{record.deductions.tax.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Loans:</span>
                            <span className="font-medium">₱{record.deductions.loans.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between border-t border-red-200 pt-2 font-semibold">
                            <span>Total Deductions:</span>
                            <span>₱{Object.values(record.deductions).reduce((sum, val) => sum + val, 0).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Net Pay */}
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h4 className="font-medium text-blue-800 mb-3">Net Pay</h4>
                        <div className="text-center">
                          <p className="text-3xl font-bold text-blue-900 mb-2">
                            ₱{record.netPay.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-600">Take Home Pay</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-blue-200">
                          <button className="w-full btn-primary text-sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download Payslip
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredRecords.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No payroll records found</h3>
                  <p className="text-gray-600">No records match your current filter criteria.</p>
                </div>
              )}
            </div>
          )}

          {/* Generate Payroll Tab */}
          {activeTab === 'generate' && isAdmin && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Generate Payroll</h2>
              
              <form className="max-w-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Pay Period</label>
                    <select className="form-input">
                      <option value="">Select pay period</option>
                      <option value="December 16-31, 2024">December 16-31, 2024</option>
                      <option value="January 1-15, 2025">January 1-15, 2025</option>
                      <option value="January 16-31, 2025">January 16-31, 2025</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="form-label">Pay Date</label>
                    <input type="date" className="form-input" />
                  </div>
                  
                  <div>
                    <label className="form-label">Department</label>
                    <select className="form-input">
                      <option value="all">All Departments</option>
                      <option value="Executive">Executive</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Sales">Sales</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="form-label">Employee Type</label>
                    <select className="form-input">
                      <option value="all">All Types</option>
                      <option value="Regular">Regular</option>
                      <option value="Probationary">Probationary</option>
                      <option value="Contractual">Contractual</option>
                      <option value="Part-time">Part-time</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6">
                  <label className="form-label">Special Adjustments</label>
                  <textarea 
                    className="form-input" 
                    rows={3} 
                    placeholder="Any special adjustments or notes for this payroll period..."
                  ></textarea>
                </div>
                
                <div className="mt-8 flex space-x-4">
                  <button type="submit" className="btn-primary">
                    Generate Payroll
                  </button>
                  <button type="button" className="btn-secondary">
                    Preview
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

export default Payroll;