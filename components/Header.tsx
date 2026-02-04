
import React from 'react';
import { UserRole } from '../types';

interface HeaderProps {
  role: UserRole;
  toggleRole: () => void;
  setSidebarOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ role, toggleRole, setSidebarOpen }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shrink-0">
      <div className="flex items-center">
        <button onClick={setSidebarOpen} className="md:hidden p-2 text-slate-500">
          <i className="fas fa-bars"></i>
        </button>
        <h1 className="text-lg font-semibold text-slate-800 ml-2 md:ml-0">
          Welcome back, Alex
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden sm:block">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <i className="fas fa-search"></i>
          </span>
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 w-64"
          />
        </div>

        <button 
          onClick={toggleRole}
          className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
            role === UserRole.ADMIN 
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
              : 'bg-amber-100 text-amber-700 border border-amber-200'
          }`}
        >
          {role} View
        </button>

        <div className="flex items-center space-x-2">
           <button className="p-2 text-slate-400 hover:text-slate-600 relative">
            <i className="fas fa-bell"></i>
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
