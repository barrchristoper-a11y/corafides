
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { UserRole, AnalyticsData } from '../types';
import { insightsService } from '../geminiService';

const data: AnalyticsData[] = [
  { month: 'Jan', revenue: 4000, orders: 240 },
  { month: 'Feb', revenue: 3000, orders: 198 },
  { month: 'Mar', revenue: 2000, orders: 150 },
  { month: 'Apr', revenue: 2780, orders: 210 },
  { month: 'May', revenue: 1890, orders: 140 },
  { month: 'Jun', revenue: 2390, orders: 180 },
  { month: 'Jul', revenue: 3490, orders: 250 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

const DashboardView: React.FC<{ role: UserRole }> = ({ role }) => {
  const [aiInsight, setAiInsight] = useState<string>('Analyzing your sales data...');

  useEffect(() => {
    const fetchInsights = async () => {
      const insight = await insightsService.getSalesAnalysis(data);
      setAiInsight(insight);
    };
    fetchInsights();
  }, [role]);

  const stats = role === UserRole.ADMIN 
    ? [
        { label: 'Total Revenue', value: '$124,592', change: '+12.5%', icon: 'fa-dollar-sign', color: 'indigo' },
        { label: 'Total Orders', value: '1,482', change: '+8.2%', icon: 'fa-shopping-bag', color: 'emerald' },
        { label: 'Active Customers', value: '892', change: '+5.4%', icon: 'fa-users', color: 'sky' },
        { label: 'Conversion Rate', value: '3.42%', change: '-0.5%', icon: 'fa-percent', color: 'rose' },
      ]
    : [
        { label: 'My Sales', value: '$12,402', change: '+4.2%', icon: 'fa-chart-line', color: 'indigo' },
        { label: 'Pending Orders', value: '24', change: '-2.1%', icon: 'fa-clock', color: 'amber' },
        { label: 'Avg Order Value', value: '$84.50', change: '+1.5%', icon: 'fa-tag', color: 'emerald' },
        { label: 'Product Views', value: '4.2k', change: '+18%', icon: 'fa-eye', color: 'violet' },
      ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center`}>
                <i className={`fas ${stat.icon}`}></i>
              </div>
              <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800">Revenue Performance</h3>
            <select className="text-sm bg-slate-50 border-none rounded-lg py-1 px-3 text-slate-500">
              <option>Last 7 Months</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  cursor={{ stroke: '#6366f1', strokeWidth: 2 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-indigo-900 p-6 rounded-2xl shadow-xl text-white flex flex-col relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-wand-magic-sparkles text-indigo-300"></i>
              <h3 className="font-bold">Gemini AI Insights</h3>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 min-h-[120px]">
              <p className="text-sm leading-relaxed text-indigo-50 font-medium">
                {aiInsight}
              </p>
            </div>
            <button className="mt-6 w-full py-3 bg-white text-indigo-900 font-bold rounded-xl text-sm transition hover:bg-indigo-50">
              Generate Detailed Report
            </button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-indigo-500/20 rounded-full"></div>
          <div className="absolute bottom-[-40px] left-[-20px] w-48 h-48 bg-indigo-500/10 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-6">Recent Sales</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://picsum.photos/seed/${i + 10}/40/40`} alt="Avatar" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Customer Name {i + 1}</p>
                    <p className="text-xs text-slate-500">2 mins ago • SKU-89021</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-800">+$124.50</p>
                  <span className="text-[10px] px-2 py-1 bg-emerald-50 text-emerald-600 rounded-full font-bold uppercase">Success</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <h3 className="font-bold text-slate-800 mb-6">Sales by Category</h3>
           <div className="h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={[
                 { name: 'Electronics', value: 450 },
                 { name: 'Fashion', value: 320 },
                 { name: 'Home', value: 210 },
                 { name: 'Beauty', value: 180 },
               ]}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                 <Tooltip />
                 <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                   {[0, 1, 2, 3].map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
