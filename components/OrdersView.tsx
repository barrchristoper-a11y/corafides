
import React from 'react';
import { UserRole, Order } from '../types';

const ORDERS: Order[] = [
  { id: 'ORD-9021', customer: 'Sarah Johnson', date: 'Oct 24, 2023', amount: 450.00, status: 'Completed' },
  { id: 'ORD-9022', customer: 'Michael Chen', date: 'Oct 24, 2023', amount: 129.50, status: 'Processing' },
  { id: 'ORD-9023', customer: 'Emily Davis', date: 'Oct 23, 2023', amount: 892.00, status: 'Pending' },
  { id: 'ORD-9024', customer: 'Robert Wilson', date: 'Oct 23, 2023', amount: 24.99, status: 'Completed' },
  { id: 'ORD-9025', customer: 'Jessica Miller', date: 'Oct 22, 2023', amount: 310.00, status: 'Cancelled' },
];

const OrdersView: React.FC<{ role: UserRole }> = ({ role }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Order Management</h2>
        <p className="text-slate-500">Track and fulfill customer orders globally</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {['All Orders', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((filter, i) => (
          <button key={i} className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition ${
            i === 0 ? 'bg-slate-800 text-white shadow-lg' : 'bg-white text-slate-600 border border-slate-200'
          }`}>
            {filter}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-indigo-600">#{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <img src={`https://picsum.photos/seed/${order.id}/32/32`} className="w-6 h-6 rounded-full" />
                       <span className="text-sm font-medium text-slate-700">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500">{order.date}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-slate-800">${order.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 
                      order.status === 'Processing' ? 'bg-sky-50 text-sky-600' : 
                      order.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 
                      'bg-rose-50 text-rose-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 bg-slate-50/50 flex justify-between items-center text-sm text-slate-500">
          <span>Showing 5 of 124 orders</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200"><i className="fas fa-chevron-left text-xs"></i></button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white border border-indigo-600 font-bold">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200 font-bold">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200"><i className="fas fa-chevron-right text-xs"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
