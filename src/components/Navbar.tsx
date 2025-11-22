import { Sparkles, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onNavigate('landing');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => onNavigate(user ? (user.role === 'hr' ? 'hr-dashboard' : 'dashboard') : 'landing')}
            className="flex items-center space-x-2 group"
          >
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-2 rounded-lg group-hover:shadow-lg transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Intervau.AI
            </span>
          </button>

          {user && (
            <div className="flex items-center space-x-6">
              {user.role === 'candidate' && (
                <>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className={`text-sm font-medium transition-colors ${
                      currentPage === 'dashboard'
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => onNavigate('resume')}
                    className={`text-sm font-medium transition-colors ${
                      currentPage === 'resume'
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Resume
                  </button>
                  <button
                    onClick={() => onNavigate('mock-interview')}
                    className={`text-sm font-medium transition-colors ${
                      currentPage === 'mock-interview'
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Mock Interview
                  </button>
                </>
              )}

              {user.role === 'hr' && (
                <>
                  <button
                    onClick={() => onNavigate('hr-dashboard')}
                    className={`text-sm font-medium transition-colors ${
                      currentPage === 'hr-dashboard'
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => onNavigate('job-positions')}
                    className={`text-sm font-medium transition-colors ${
                      currentPage === 'job-positions'
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Positions
                  </button>
                  <button
                    onClick={() => onNavigate('hr-candidates')}
                    className={`text-sm font-medium transition-colors ${
                      currentPage === 'hr-candidates'
                        ? 'text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Candidates
                  </button>
                </>
              )}

              <div className="flex items-center space-x-3 pl-6 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {!user && (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onNavigate('login')}
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:shadow-lg transition-shadow"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
