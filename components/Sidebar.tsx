
import React from 'react';
import { UserRole } from '../types';

interface SidebarProps {
  isOpen: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role: UserRole;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab, role }) => {
  const menuItems = [
    { name: 'Dashboard', icon: 'fa-chart-pie' },
    { name: 'Products', icon: 'fa-box' },
    { name: 'Orders', icon: 'fa-shopping-cart' },
    { name: 'Customers', icon: 'fa-users', adminOnly: true },
    { name: 'Analytics', icon: 'fa-line-chart' },
    { name: 'Settings', icon: 'fa-cog' },
  ];

  const filteredItems = menuItems.filter(item => !item.adminOnly || role === UserRole.ADMIN);

  return (
    <div className={`${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 bg-white border-r border-slate-200 h-full flex flex-col hidden md:flex`}>
      <div className="p-6 flex items-center space-x-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white shrink-0">
          <i className="fas fa-layer-group text-xl"></i>
        </div>
        {isOpen && <span className="font-bold text-xl tracking-tight text-slate-800">CORAFIDES</span>}
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {filteredItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveTab(item.name)}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-colors ${
              activeTab === item.name 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
            }`}
          >
            <i className={`fas ${item.icon} w-6 text-lg`}></i>
            {isOpen && <span className="font-medium">{item.name}</span>}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center p-2 rounded-xl bg-slate-50">
          <img src="https://picsum.photos/40/40" alt="Avatar" className="w-8 h-8 rounded-full border-2 border-white" />
          {isOpen && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-semibold text-slate-700 truncate">Alex Corafides</p>
              <p className="text-xs text-slate-500 capitalize">{role.toLowerCase()}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
