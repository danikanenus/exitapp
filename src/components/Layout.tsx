import React from 'react';
import { BookOpen, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">Ethiopian Exit Exam</h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">University Study Platform</p>
              </div>
            </div>
            
            {user && (
              <>
                {/* Desktop User Menu */}
                <div className="hidden sm:flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700 truncate max-w-32">{user.name}</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {user.role}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Logout</span>
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="sm:hidden">
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                  </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                  <div className="absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg sm:hidden z-50">
                    <div className="px-4 py-4 space-y-3">
                      <div className="flex items-center space-x-2 pb-3 border-b border-gray-200">
                        <User className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{user.name}</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {user.role}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors w-full"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {children}
      </main>
    </div>
  );
};