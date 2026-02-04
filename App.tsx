
import React, { useState, useEffect } from 'react';
import { UserRole } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import ProductsView from './components/ProductsView';
import OrdersView from './components/OrdersView';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.ADMIN);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleRole = () => {
    setRole(prev => prev === UserRole.ADMIN ? UserRole.SELLER : UserRole.ADMIN);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Dashboard':
        return <DashboardView role={role} />;
      case 'Products':
        return <ProductsView role={role} />;
      case 'Orders':
        return <OrdersView role={role} />;
      default:
        return <DashboardView role={role} />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar 
        isOpen={isSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        role={role}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header 
          role={role} 
          toggleRole={toggleRole} 
          setSidebarOpen={() => setSidebarOpen(!isSidebarOpen)}
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
