import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Download,
  Calendar,
  Users,
  DollarSign,
  Clock,
  Filter,
  FileText,
  Eye
} from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('last-month');

  const reportTypes = [
    { id: 'overview', name: 'HR Overview', icon: BarChart3 },
    { id: 'attendance', name: 'Attendance Report', icon: Clock },
    { id: 'payroll', name: 'Payroll Summary', icon: DollarSign },
    { id: 'leave', name: 'Leave Analytics', icon: Calendar },
    { id: 'performance', name: 'Performance Metrics', icon: TrendingUp },
    { id: 'recruitment', name: 'Recruitment Report', icon: Users }
  ];

  // Mock data for reports
  const reportData = {
    overview: {
      totalEmployees: 247,
      activeEmployees: 235,
      newHires: 12,
      turnoverRate: 4.8,
      avgSalary: 45000,
      totalPayroll: 11115000
    },
    attendance: {
      avgAttendanceRate: 96.5,
      lateArrivals: 23,
      earlyDepartures: 8,
      absences: 15,
      overtimeHours: 245
    },
    leave: {
      totalRequests: 45,
      approved: 38,
      pending: 5,
      rejected: 2,
      mostUsedType: 'Vacation Leave'
    }
  };

  const chartData = [
    { month: 'Jan', employees: 240, turnover: 2 },
    { month: 'Feb', employees: 242, turnover: 3 },
    { month: 'Mar', employees: 245, turnover: 1 },
    { month: 'Apr', employees: 247, turnover: 4 },
    { month: 'May', employees: 245, turnover: 2 },
    { month: 'Jun', employees: 247, turnover: 3 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive HR metrics and insights</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-secondary flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
          <button className="btn-primary flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-8">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="form-label">Report Type</label>
              <select
                value={selectedReport}
                onChange={(e) => setSelectedReport(e.target.value)}
                className="form-input"
              >
                {reportTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="form-label">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="form-input"
              >
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-quarter">Last Quarter</option>
                <option value="last-year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="form-label">Department</label>
              <select className="form-input">
                <option value="all">All Departments</option>
                <option value="executive">Executive</option>
                <option value="hr">Human Resources</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Report Content */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Report Navigation */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">Report Types</h3>
            </div>
            <div className="card-body p-0">
              <nav className="space-y-1">
                {reportTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedReport(type.id)}
                    className={`w-full text-left px-4 py-3 flex items-center hover:bg-gray-50 transition-colors ${
                      selectedReport === type.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <type.icon className="w-4 h-4 mr-3" />
                    {type.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Report Display */}
        <div className="lg:col-span-3">
          {/* HR Overview Report */}
          {selectedReport === 'overview' && (
            <div className="space-y-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="font-semibold text-gray-900">HR Overview Dashboard</h3>
                </div>
                <div className="card-body">
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{reportData.overview.totalEmployees}</p>
                      <p className="text-sm text-gray-600">Total Employees</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">{reportData.overview.newHires}</p>
                      <p className="text-sm text-gray-600">New Hires</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <DollarSign className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-gray-900">₱{reportData.overview.avgSalary.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Avg Salary</p>
                    </div>
                  </div>

                  {/* Chart Placeholder */}
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Employee Growth Chart</p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Key Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Active Employees:</span>
                          <span className="font-medium">{reportData.overview.activeEmployees}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Turnover Rate:</span>
                          <span className="font-medium">{reportData.overview.turnoverRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Payroll:</span>
                          <span className="font-medium">₱{reportData.overview.totalPayroll.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Department Breakdown</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Sales:</span>
                          <span className="font-medium">89 employees</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Marketing:</span>
                          <span className="font-medium">45 employees</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Operations:</span>
                          <span className="font-medium">67 employees</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Support:</span>
                          <span className="font-medium">46 employees</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Attendance Report */}
          {selectedReport === 'attendance' && (
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">Attendance Report</h3>
              </div>
              <div className="card-body">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{reportData.attendance.avgAttendanceRate}%</p>
                    <p className="text-sm text-gray-600">Avg Attendance Rate</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{reportData.attendance.lateArrivals}</p>
                    <p className="text-sm text-gray-600">Late Arrivals</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{reportData.attendance.absences}</p>
                    <p className="text-sm text-gray-600">Absences</p>
                  </div>
                </div>

                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Attendance Trends Chart</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Leave Analytics */}
          {selectedReport === 'leave' && (
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">Leave Analytics</h3>
              </div>
              <div className="card-body">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{reportData.leave.totalRequests}</p>
                    <p className="text-sm text-gray-600">Total Requests</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{reportData.leave.approved}</p>
                    <p className="text-sm text-gray-600">Approved</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{reportData.leave.pending}</p>
                    <p className="text-sm text-gray-600">Pending</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <Calendar className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">{reportData.leave.rejected}</p>
                    <p className="text-sm text-gray-600">Rejected</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Leave Types Distribution</p>
                    </div>
                  </div>
                  <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">Monthly Leave Trends</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other report types would follow similar patterns */}
          {!['overview', 'attendance', 'leave'].includes(selectedReport) && (
            <div className="card">
              <div className="card-header">
                <h3 className="font-semibold text-gray-900">
                  {reportTypes.find(t => t.id === selectedReport)?.name}
                </h3>
              </div>
              <div className="card-body">
                <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Report content will be displayed here</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;