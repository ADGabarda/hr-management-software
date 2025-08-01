import React, { useState } from 'react';
import { 
  UserPlus, 
  Search, 
  Filter,
  Eye,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Star,
  Plus,
  FileText
} from 'lucide-react';

const Recruitment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jobs' | 'candidates' | 'interviews'>('jobs');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data
  const jobPostings = [
    {
      id: 1,
      title: 'Senior Sales Executive',
      department: 'Sales',
      location: 'Makati City',
      type: 'Full-time',
      status: 'Active',
      applicants: 24,
      posted: '2024-12-01',
      deadline: '2024-12-31'
    },
    {
      id: 2,
      title: 'Marketing Specialist',
      department: 'Marketing',
      location: 'BGC, Taguig',
      type: 'Full-time',
      status: 'Active',
      applicants: 18,
      posted: '2024-12-05',
      deadline: '2025-01-15'
    },
    {
      id: 3,
      title: 'HR Assistant',
      department: 'Human Resources',
      location: 'Ortigas, Pasig',
      type: 'Full-time',
      status: 'Closed',
      applicants: 45,
      posted: '2024-11-15',
      deadline: '2024-12-15'
    }
  ];

  const candidates = [
    {
      id: 1,
      name: 'Anna Marie Santos',
      position: 'Senior Sales Executive',
      email: 'anna.santos@email.com',
      phone: '+63 917 123 4567',
      location: 'Quezon City',
      experience: '5 years',
      education: 'Bachelor of Business Administration',
      status: 'Interview Scheduled',
      rating: 4.5,
      appliedDate: '2024-12-10'
    },
    {
      id: 2,
      name: 'Michael John Reyes',
      position: 'Marketing Specialist',
      email: 'michael.reyes@email.com',
      phone: '+63 917 234 5678',
      location: 'Makati City',
      experience: '3 years',
      education: 'Bachelor of Marketing',
      status: 'Under Review',
      rating: 4.2,
      appliedDate: '2024-12-08'
    },
    {
      id: 3,
      name: 'Sarah Grace Villanueva',
      position: 'HR Assistant',
      email: 'sarah.villanueva@email.com',
      phone: '+63 917 345 6789',
      location: 'Pasig City',
      experience: '2 years',
      education: 'Bachelor of Psychology',
      status: 'Hired',
      rating: 4.8,
      appliedDate: '2024-11-20'
    }
  ];

  const interviews = [
    {
      id: 1,
      candidate: 'Anna Marie Santos',
      position: 'Senior Sales Executive',
      date: '2024-12-20',
      time: '10:00 AM',
      interviewer: 'Maria Santos Rodriguez',
      type: 'Final Interview',
      status: 'Scheduled'
    },
    {
      id: 2,
      candidate: 'Michael John Reyes',
      position: 'Marketing Specialist',
      date: '2024-12-18',
      time: '2:00 PM',
      interviewer: 'Juan Carlos Dela Cruz',
      type: 'Initial Interview',
      status: 'Completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Hired':
      case 'Scheduled':
        return 'status-active';
      case 'Closed':
      case 'Rejected':
        return 'status-inactive';
      case 'Under Review':
      case 'Interview Scheduled':
        return 'status-pending';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Recruitment & Hiring</h1>
          <p className="text-gray-600">Manage job postings, candidates, and interviews</p>
        </div>
        <button className="btn-primary flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </button>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-grid mb-8">
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Job Postings</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobPostings.filter(job => job.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <UserPlus className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Candidates</p>
              <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Interviews Scheduled</p>
              <p className="text-2xl font-bold text-gray-900">
                {interviews.filter(interview => interview.status === 'Scheduled').length}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Hired This Month</p>
              <p className="text-2xl font-bold text-gray-900">
                {candidates.filter(candidate => candidate.status === 'Hired').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'jobs', name: 'Job Postings', icon: Briefcase },
              { id: 'candidates', name: 'Candidates', icon: UserPlus },
              { id: 'interviews', name: 'Interviews', icon: Calendar }
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
          {/* Job Postings Tab */}
          {activeTab === 'jobs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Job Postings</h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="form-input"
                  >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {jobPostings.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{job.title}</h3>
                          <span className={`${getStatusColor(job.status)} text-xs`}>
                            {job.status}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600">
                              <Briefcase className="w-4 h-4 inline mr-1" />
                              {job.department} • {job.type}
                            </p>
                            <p className="text-sm text-gray-600">
                              <MapPin className="w-4 h-4 inline mr-1" />
                              {job.location}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              <UserPlus className="w-4 h-4 inline mr-1" />
                              {job.applicants} applicants
                            </p>
                            <p className="text-sm text-gray-600">
                              <Calendar className="w-4 h-4 inline mr-1" />
                              Deadline: {new Date(job.deadline).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-xs text-gray-500">
                          Posted: {new Date(job.posted).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Candidates Tab */}
          {activeTab === 'candidates' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Candidates</h2>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search candidates..."
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.map((candidate) => (
                  <div key={candidate.id} className="card hover:shadow-lg transition-all duration-200">
                    <div className="card-body">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {candidate.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-3">
                            <h3 className="font-semibold text-gray-900">{candidate.name}</h3>
                            <p className="text-sm text-gray-600">{candidate.position}</p>
                          </div>
                        </div>
                        <span className={`${getStatusColor(candidate.status)} text-xs`}>
                          {candidate.status}
                        </span>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="w-4 h-4 mr-2" />
                          {candidate.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="w-4 h-4 mr-2" />
                          {candidate.phone}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {candidate.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {candidate.experience} experience
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <GraduationCap className="w-4 h-4 mr-2" />
                          {candidate.education}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm font-medium">{candidate.rating}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                            <Calendar className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interviews Tab */}
          {activeTab === 'interviews' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Interview Schedule</h2>
                <button className="btn-primary text-sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Interview
                </button>
              </div>

              <div className="space-y-4">
                {interviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{interview.candidate}</h3>
                          <span className={`${getStatusColor(interview.status)} text-xs`}>
                            {interview.status}
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-gray-600">
                              <Briefcase className="w-4 h-4 inline mr-1" />
                              Position: {interview.position}
                            </p>
                            <p className="text-sm text-gray-600">
                              <Calendar className="w-4 h-4 inline mr-1" />
                              {new Date(interview.date).toLocaleDateString()} at {interview.time}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              Interviewer: {interview.interviewer}
                            </p>
                            <p className="text-sm text-gray-600">
                              Type: {interview.type}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                          <Calendar className="w-4 h-4" />
                        </button>
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

export default Recruitment;