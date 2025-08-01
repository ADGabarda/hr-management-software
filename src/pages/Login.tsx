import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Building2, User, Lock, Eye, EyeOff, Shield } from 'lucide-react';

const Login: React.FC = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (isLoading) return;

    try {
      await login(employeeId, password);
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
              <Building2 className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Employee Login</h2>
          <p className="mt-2 text-gray-600">Afflatus Realty Inc. HR System</p>
        </div>

        {/* Login Form */}
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="employeeId" className="form-label">
                  Employee ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="employeeId"
                    type="text"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                    className="form-input pl-10"
                    placeholder="Enter your Employee ID"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input pl-10 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <div><strong>Master Admin:</strong> ADMIN001 / admin123</div>
                <div><strong>CEO:</strong> EMP001 / admin123</div>
                <div><strong>HR:</strong> EMP002 / hr123</div>
                <div><strong>Employee:</strong> EMP003 / emp123</div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="text-center">
          <p className="text-xs text-gray-500">
            This system is for authorized personnel only. All activities are logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;