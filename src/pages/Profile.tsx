import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase,
  Edit,
  Save,
  Camera,
  Shield,
  Clock,
  Award,
  FileText
} from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'personal' | 'employment' | 'emergency'>('personal');

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="card mb-8">
        <div className="card-body">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <p className="text-lg text-gray-600">{user.role}</p>
                  <p className="text-sm text-gray-500">Employee ID: {user.employeeId}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className="status-active text-xs">{user.status}</span>
                    <span className="text-xs text-gray-500">
                      <Calendar className="w-3 h-3 inline mr-1" />
                      Joined {new Date(user.hireDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className={`${isEditing ? 'btn-success' : 'btn-secondary'} text-sm`}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="dashboard-grid mb-8">
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Years of Service</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.floor((new Date().getTime() - new Date(user.hireDate).getTime()) / (1000 * 60 * 60 * 24 * 365))}
              </p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Leave Balance</p>
              <p className="text-2xl font-bold text-gray-900">15</p>
              <p className="text-xs text-gray-500">days remaining</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Performance</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
              <p className="text-xs text-gray-500">out of 5.0</p>
            </div>
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Documents</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-gray-500">uploaded</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Tabs */}
      <div className="card">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {[
              { id: 'personal', name: 'Personal Information', icon: User },
              { id: 'employment', name: 'Employment Details', icon: Briefcase },
              { id: 'emergency', name: 'Emergency Contact', icon: Shield }
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
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Full Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      defaultValue={user.name}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="form-label">Employee ID</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      defaultValue={user.employeeId}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      defaultValue={user.email}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      defaultValue={user.phone}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="form-label">Date of Birth</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      defaultValue="1990-01-15"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="form-label">Gender</label>
                    <select className="form-input" disabled={!isEditing}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="form-label">Address</label>
                  <textarea 
                    className="form-input" 
                    rows={3}
                    defaultValue={user.address}
                    disabled={!isEditing}
                  ></textarea>
                </div>
              </form>
            </div>
          )}

          {/* Employment Details Tab */}
          {activeTab === 'employment' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Employment Details</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Job Title</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      defaultValue={user.role}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="form-label">Department</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      defaultValue={user.department}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="form-label">Employment Type</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      defaultValue={user.employmentType}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="form-label">Employment Status</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      defaultValue={user.status}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="form-label">Hire Date</label>
                    <input 
                      type="date" 
                      className="form-input" 
                      defaultValue={user.hireDate}
                      disabled
                    />
                  </div>
                  <div>
                    <label className="form-label">Manager</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      defaultValue="Maria Santos Rodriguez"
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Work Schedule</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="form-label">Start Time</label>
                      <input 
                        type="time" 
                        className="form-input" 
                        defaultValue="09:00"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="form-label">End Time</label>
                      <input 
                        type="time" 
                        className="form-input" 
                        defaultValue="18:00"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="form-label">Work Days</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        defaultValue="Monday - Friday"
                        disabled
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Emergency Contact Tab */}
          {activeTab === 'emergency' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Emergency Contact</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Contact Name</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      defaultValue={user.emergencyContact.name}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="form-label">Relationship</label>
                    <select className="form-input" disabled={!isEditing}>
                      <option value="spouse">Spouse</option>
                      <option value="parent">Parent</option>
                      <option value="sibling">Sibling</option>
                      <option value="child">Child</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input 
                      type="tel" 
                      className="form-input" 
                      defaultValue={user.emergencyContact.phone}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      defaultValue="emergency@example.com"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Address</label>
                  <textarea 
                    className="form-input" 
                    rows={3}
                    defaultValue={user.emergencyContact.address}
                    disabled={!isEditing}
                  ></textarea>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex">
                    <Shield className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-800">Important Note</h4>
                      <p className="text-sm text-yellow-700 mt-1">
                        This information will only be used in case of emergencies. Please ensure all details are accurate and up to date.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;