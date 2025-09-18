import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Upload, 
  Settings, 
  Zap, 
  Table, 
  BarChart3, 
  Calculator,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, allowedRoles: ['admin', 'company', 'student'] },
    { name: 'Data Upload', href: '/upload', icon: Upload, allowedRoles: ['admin', 'company'] },
    { name: 'Configuration', href: '/configuration', icon: Settings, allowedRoles: ['admin'] },
    { name: 'Matchmaking', href: '/matchmaking', icon: Zap, allowedRoles: ['admin', 'company'] },
    { name: 'Results', href: '/results', icon: Table, allowedRoles: ['admin', 'company', 'student'] },
    { name: 'Analytics', href: '/analytics', icon: BarChart3, allowedRoles: ['admin', 'company', 'student'] },
    { name: 'What-If Simulator', href: '/what-if', icon: Calculator, allowedRoles: ['admin', 'company'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    item.allowedRoles.includes(user?.role)
  );

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-white" />
            </div>
            <span className="ml-3 text-lg font-semibold text-gray-900">Smart Allocator</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {filteredNavigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`
                }
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    onClose();
                  }
                }}
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>
        
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-800 font-medium">
              Logged in as: {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
            </p>
            <div className="flex items-center mt-1">
              <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
              <span className="text-xs text-blue-700">All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;