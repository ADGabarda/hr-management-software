import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle,
  FileText,
  Award,
  UserPlus,
  ArrowRight,
  Activity
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const isAdmin = user?.role && ['Master Admin', 'President/CEO', 'Vice President', 'IT Head', 'HR', 'Admin'].includes(user.role);

  const quickActions = [
    { title: 'Apply for Leave', href: '/leave', icon: Calendar, color: 'blue' },
    { title: 'View Payslip', href: '/payroll', icon: DollarSign, color: 'green' },
    { title: 'Update Profile', href: '/profile', icon: Users, color: 'purple' },
    { title: 'Performance Review', href: '/performance', icon: Award, color: 'yellow' },
  ];

  const adminActions = [
    { title: 'User Management', href: '/user-management', icon: Users, color: 'red' },
    { title: 'Manage Employees', href: '/employees', icon: Users, color: 'blue' },
    { title: 'Process Payroll', href: '/payroll', icon: DollarSign, color: 'green' },
    { title: 'Review Applications', href: '/leave', icon: Calendar, color: 'purple' },
    { title: 'View Reports', href: '/reports', icon: FileText, color: 'red' },
  ];

  const recentActivities = [
    { type: 'leave', message: 'Leave application approved', time: '2 hours ago', status: 'success' },
    { type: 'payroll', message: 'Payslip generated for December 2024', time: '1 day ago', status: 'info' },
    { type: 'performance', message: 'Performance review scheduled', time: '3 days ago', status: 'warning' },
    { type: 'training', message: 'Training module completed', time: '1 week ago', status: 'success' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <Activity className="w-4 h-4 text-blue-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          {user?.role} • {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid mb-8">
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">247</p>
              <p className="text-xs text-green-600">+5 this month</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Leave Requests</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-yellow-600">3 pending approval</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Payroll</p>
              <p className="text-2xl font-bold text-gray-900">₱2.4M</p>
              <p className="text-xs text-blue-600">December 2024</p>
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Performance</p>
              <p className="text-2xl font-bold text-gray-900">94%</p>
              <p className="text-xs text-green-600">Above target</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900">
                {isAdmin ? 'Admin Actions' : 'Quick Actions'}
              </h2>
            </div>
            <div className="card-body">
              <div className="grid md:grid-cols-2 gap-4">
                {(isAdmin ? adminActions : quickActions).map((action, index) => (
                  <Link
                    key={index}
                    to={action.href}
                    className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all duration-200 group"
                  >
                    <div className="flex items-center">
                      <div className={`p-2 bg-${action.color}-100 rounded-lg group-hover:bg-${action.color}-200 transition-colors`}>
                        <action.icon className={`w-5 h-5 text-${action.color}-600`} />
                      </div>
                      <div className="ml-3 flex-1">
                        <p className="font-medium text-gray-900">{action.title}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="card mt-8">
            <div className="card-header">
              <h2 className="text-xl font-semibold text-gray-900">Recent Activities</h2>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0">
                      {getStatusIcon(activity.status)}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="card">
            <div className="card-body text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">
                  {user?.name?.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-600">{user?.role}</p>
              <p className="text-xs text-gray-500 mt-1">Employee ID: {user?.employeeId}</p>
              <Link
                to="/profile"
                className="mt-4 btn-secondary text-sm w-full justify-center"
              >
                View Profile
              </Link>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">Upcoming Events</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex items-center p-2 bg-blue-50 rounded-lg">
                  <Calendar className="w-4 h-4 text-blue-600 mr-2" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Team Meeting</p>
                    <p className="text-gray-600">Tomorrow, 2:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center p-2 bg-green-50 rounded-lg">
                  <Award className="w-4 h-4 text-green-600 mr-2" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Performance Review</p>
                    <p className="text-gray-600">Dec 28, 2024</p>
                  </div>
                </div>
                <div className="flex items-center p-2 bg-purple-50 rounded-lg">
                  <UserPlus className="w-4 h-4 text-purple-600 mr-2" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">New Hire Orientation</p>
                    <p className="text-gray-600">Jan 2, 2025</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <div className="card-header">
              <h3 className="font-semibold text-gray-900">Your Stats</h3>
            </div>
            <div className="card-body">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Leave Balance</span>
                  <span className="font-medium text-gray-900">15 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Attendance Rate</span>
                  <span className="font-medium text-green-600">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Performance Score</span>
                  <span className="font-medium text-blue-600">4.8/5.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Training Hours</span>
                  <span className="font-medium text-purple-600">24 hrs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;