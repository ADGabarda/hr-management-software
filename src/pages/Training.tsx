import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Play,
  CheckCircle,
  Clock,
  Users,
  Calendar,
  Award,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const Training: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'progress' | 'certificates'>('courses');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock data
  const courses = [
    {
      id: 1,
      title: 'Leadership Excellence Program',
      category: 'Leadership',
      duration: '8 hours',
      modules: 12,
      enrolled: 45,
      completed: 32,
      status: 'Active',
      progress: 75,
      instructor: 'Maria Santos Rodriguez',
      description: 'Comprehensive leadership development program for managers and supervisors.'
    },
    {
      id: 2,
      title: 'Digital Marketing Fundamentals',
      category: 'Marketing',
      duration: '6 hours',
      modules: 8,
      enrolled: 28,
      completed: 28,
      status: 'Completed',
      progress: 100,
      instructor: 'External Trainer',
      description: 'Learn the basics of digital marketing including SEO, social media, and analytics.'
    },
    {
      id: 3,
      title: 'Customer Service Excellence',
      category: 'Customer Service',
      duration: '4 hours',
      modules: 6,
      enrolled: 67,
      completed: 45,
      status: 'Active',
      progress: 60,
      instructor: 'Juan Carlos Dela Cruz',
      description: 'Enhance customer service skills and learn best practices for client interaction.'
    },
    {
      id: 4,
      title: 'Data Privacy and Security',
      category: 'Compliance',
      duration: '3 hours',
      modules: 5,
      enrolled: 89,
      completed: 89,
      status: 'Mandatory',
      progress: 100,
      instructor: 'IT Department',
      description: 'Essential training on data privacy laws and cybersecurity best practices.'
    }
  ];

  const userProgress = [
    {
      courseId: 1,
      courseName: 'Leadership Excellence Program',
      progress: 75,
      completedModules: 9,
      totalModules: 12,
      lastAccessed: '2024-12-15',
      timeSpent: '6 hours',
      status: 'In Progress'
    },
    {
      courseId: 2,
      courseName: 'Digital Marketing Fundamentals',
      progress: 100,
      completedModules: 8,
      totalModules: 8,
      lastAccessed: '2024-12-10',
      timeSpent: '6 hours',
      status: 'Completed'
    },
    {
      courseId: 4,
      courseName: 'Data Privacy and Security',
      progress: 100,
      completedModules: 5,
      totalModules: 5,
      lastAccessed: '2024-12-01',
      timeSpent: '3 hours',
      status: 'Completed'
    }
  ];

  const certificates = [
    {
      id: 1,
      courseName: 'Digital Marketing Fundamentals',
      issueDate: '2024-12-10',
      certificateId: 'CERT-2024-001',
      validUntil: '2025-12-10',
      status: 'Valid'
    },
    {
      id: 2,
      courseName: 'Data Privacy and Security',
      issueDate: '2024-12-01',
      certificateId: 'CERT-2024-002',
      validUntil: '2025-12-01',
      status: 'Valid'
    }
  ];

  const categories = ['Leadership', 'Marketing', 'Customer Service', 'Compliance', 'Technical'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Valid':
        return 'status-active';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'Mandatory':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'status-pending';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    return 'bg-yellow-500';
  };

  const filteredCourses = courses.filter(course => 
    categoryFilter === 'all' || course.category === categoryFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Training & Development</h1>
          <p className="text-gray-600">Enhance skills through our learning programs</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Enroll in Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid mb-8">
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Available Courses</p>
              <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {userProgress.filter(p => p.status === 'Completed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {userProgress.filter(p => p.status === 'In Progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Certificates</p>
              <p className="text-2xl font-bold text-gray-900">{certificates.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'courses', name: 'Available Courses', icon: BookOpen },
              { id: 'progress', name: 'My Progress', icon: Clock },
              { id: 'certificates', name: 'Certificates', icon: Award }
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
          {/* Available Courses Tab */}
          {activeTab === 'courses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Available Courses</h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="form-input"
                  >
                    <option value="all">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {filteredCourses.map((course) => (
                  <div key={course.id} className="card hover:shadow-lg transition-all duration-200">
                    <div className="card-body">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-gray-900">{course.title}</h3>
                            <span className={`${getStatusColor(course.status)} text-xs`}>
                              {course.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-sm text-gray-600">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {course.duration}
                        </div>
                        <div className="text-sm text-gray-600">
                          <BookOpen className="w-4 h-4 inline mr-1" />
                          {course.modules} modules
                        </div>
                        <div className="text-sm text-gray-600">
                          <Users className="w-4 h-4 inline mr-1" />
                          {course.enrolled} enrolled
                        </div>
                        <div className="text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          {course.completed} completed
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Course Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-600">
                          Instructor: {course.instructor}
                        </div>
                        <button className="btn-primary text-sm flex items-center">
                          <Play className="w-4 h-4 mr-2" />
                          Start Course
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Progress Tab */}
          {activeTab === 'progress' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">My Learning Progress</h2>

              <div className="space-y-4">
                {userProgress.map((progress) => (
                  <div key={progress.courseId} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{progress.courseName}</h3>
                          <span className={`${getStatusColor(progress.status)} text-xs`}>
                            {progress.status}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4 mb-3">
                          <div className="text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 inline mr-1" />
                            {progress.completedModules}/{progress.totalModules} modules
                          </div>
                          <div className="text-sm text-gray-600">
                            <Clock className="w-4 h-4 inline mr-1" />
                            {progress.timeSpent} spent
                          </div>
                          <div className="text-sm text-gray-600">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Last: {new Date(progress.lastAccessed).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{progress.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(progress.progress)}`}
                          style={{ width: `${progress.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="btn-primary text-sm flex items-center">
                        <Play className="w-4 h-4 mr-2" />
                        {progress.status === 'Completed' ? 'Review' : 'Continue'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {userProgress.length === 0 && (
                <div className="text-center py-12">
                  <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No courses in progress</h3>
                  <p className="text-gray-600">Enroll in a course to start your learning journey.</p>
                </div>
              )}
            </div>
          )}

          {/* Certificates Tab */}
          {activeTab === 'certificates' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">My Certificates</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <div key={cert.id} className="card hover:shadow-lg transition-all duration-200">
                    <div className="card-body text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2">{cert.courseName}</h3>
                      
                      <div className="space-y-2 mb-4 text-sm text-gray-600">
                        <p>Certificate ID: {cert.certificateId}</p>
                        <p>Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                        <p>Valid Until: {new Date(cert.validUntil).toLocaleDateString()}</p>
                      </div>
                      
                      <span className={`${getStatusColor(cert.status)} text-xs mb-4 inline-block`}>
                        {cert.status}
                      </span>
                      
                      <div className="flex space-x-2">
                        <button className="btn-primary text-sm flex-1">
                          Download
                        </button>
                        <button className="btn-secondary text-sm flex-1">
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {certificates.length === 0 && (
                <div className="text-center py-12">
                  <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
                  <p className="text-gray-600">Complete courses to earn certificates.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Training;