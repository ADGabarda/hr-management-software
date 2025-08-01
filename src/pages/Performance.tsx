import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Award, 
  Target, 
  TrendingUp, 
  Star,
  Calendar,
  User,
  BarChart3,
  Plus,
  Eye,
  Edit
} from 'lucide-react';

const Performance: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'reviews' | 'feedback'>('overview');

  const isAdmin = user?.role && ['President/CEO', 'Vice President', 'IT Head', 'HR', 'Admin'].includes(user.role);

  // Mock data
  const performanceData = {
    overall: 4.8,
    goals: [
      { id: 1, title: 'Increase Sales by 20%', progress: 85, target: 100, status: 'On Track' },
      { id: 2, title: 'Complete Leadership Training', progress: 100, target: 100, status: 'Completed' },
      { id: 3, title: 'Improve Customer Satisfaction', progress: 60, target: 100, status: 'Behind' }
    ],
    reviews: [
      {
        id: 1,
        period: 'Q4 2024',
        reviewer: 'Maria Santos Rodriguez',
        score: 4.8,
        date: '2024-12-15',
        status: 'Completed'
      },
      {
        id: 2,
        period: 'Q3 2024',
        reviewer: 'Juan Carlos Dela Cruz',
        score: 4.6,
        date: '2024-09-15',
        status: 'Completed'
      }
    ],
    feedback: [
      {
        id: 1,
        from: 'Maria Santos (HR)',
        type: '360 Feedback',
        date: '2024-12-10',
        rating: 5,
        comment: 'Excellent leadership skills and team collaboration.'
      },
      {
        id: 2,
        from: 'Team Members',
        type: 'Peer Review',
        date: '2024-12-05',
        rating: 4,
        comment: 'Great communication and always willing to help.'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'status-active';
      case 'On Track': return 'bg-blue-100 text-blue-800';
      case 'Behind': return 'status-inactive';
      default: return 'status-pending';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Management</h1>
          <p className="text-gray-600">Track goals, reviews, and feedback</p>
        </div>
        {isAdmin && (
          <button className="btn-primary flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Review
          </button>
        )}
      </div>

      {/* Performance Overview Cards */}
      <div className="dashboard-grid mb-8">
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Overall Rating</p>
              <p className="text-2xl font-bold text-gray-900">{performanceData.overall}/5.0</p>
              <p className="text-xs text-green-600">Excellent</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Goals Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {performanceData.goals.filter(g => g.status === 'Completed').length}/{performanceData.goals.length}
              </p>
              <p className="text-xs text-blue-600">This quarter</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Improvement</p>
              <p className="text-2xl font-bold text-gray-900">+12%</p>
              <p className="text-xs text-green-600">vs last quarter</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{performanceData.reviews.length}</p>
              <p className="text-xs text-purple-600">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'goals', name: 'Goals & KPIs', icon: Target },
              { id: 'reviews', name: 'Performance Reviews', icon: Award },
              { id: 'feedback', name: '360° Feedback', icon: Star }
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
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Overview</h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Performance Chart */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="font-semibold text-gray-900">Performance Trend</h3>
                  </div>
                  <div className="card-body">
                    <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">Performance chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                  </div>
                  <div className="card-body">
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-green-50 rounded-lg">
                        <Award className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Q4 Review Completed</p>
                          <p className="text-xs text-gray-600">Score: 4.8/5.0 • 3 days ago</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                        <Target className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Goal Updated</p>
                          <p className="text-xs text-gray-600">Sales target progress: 85% • 1 week ago</p>
                        </div>
                      </div>
                      <div className="flex items-center p-3 bg-purple-50 rounded-lg">
                        <Star className="w-5 h-5 text-purple-600 mr-3" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">360° Feedback Received</p>
                          <p className="text-xs text-gray-600">From team members • 2 weeks ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Goals Tab */}
          {activeTab === 'goals' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Goals & KPIs</h2>
                <button className="btn-primary text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Goal
                </button>
              </div>

              <div className="space-y-4">
                {performanceData.goals.map((goal) => (
                  <div key={goal.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{goal.title}</h3>
                        <div className="flex items-center space-x-4">
                          <span className={`${getStatusColor(goal.status)} text-xs`}>
                            {goal.status}
                          </span>
                          <span className="text-sm text-gray-600">
                            Progress: {goal.progress}%
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{goal.progress}% of {goal.target}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(goal.progress)}`}
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Performance Reviews</h2>
                {isAdmin && (
                  <button className="btn-primary text-sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Review
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {performanceData.reviews.map((review) => (
                  <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{review.period} Review</h3>
                          <span className={`${getStatusColor(review.status)} text-xs`}>
                            {review.status}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600">
                              <User className="w-4 h-4 inline mr-1" />
                              Reviewer: {review.reviewer}
                            </p>
                            <p className="text-sm text-gray-600">
                              <Calendar className="w-4 h-4 inline mr-1" />
                              Date: {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              <Star className="w-4 h-4 inline mr-1" />
                              Score: {review.score}/5.0
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feedback Tab */}
          {activeTab === 'feedback' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">360° Feedback</h2>
                <button className="btn-primary text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Request Feedback
                </button>
              </div>

              <div className="space-y-4">
                {performanceData.feedback.map((feedback) => (
                  <div key={feedback.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{feedback.type}</h3>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          From: {feedback.from} • {new Date(feedback.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700">{feedback.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Performance;