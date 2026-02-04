
import React from 'react';
import { UserRole, Product } from '../types';

const PRODUCTS: Product[] = [
  { id: '1', name: 'Premium Wireless Headphones', category: 'Electronics', price: 299, stock: 45, status: 'Active', sales: 120 },
  { id: '2', name: 'Eco-Friendly Yoga Mat', category: 'Wellness', price: 49, stock: 0, status: 'Out of Stock', sales: 450 },
  { id: '3', name: 'Smart Fitness Watch v2', category: 'Electronics', price: 159, stock: 12, status: 'Active', sales: 89 },
  { id: '4', name: 'Minimalist Leather Wallet', category: 'Accessories', price: 85, stock: 8, status: 'Draft', sales: 0 },
  { id: '5', name: 'Ultra-Soft Cotton T-Shirt', category: 'Fashion', price: 35, stock: 156, status: 'Active', sales: 840 },
];

const ProductsView: React.FC<{ role: UserRole }> = ({ role }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Product Inventory</h2>
          <p className="text-slate-500">Manage your product catalog and listings</p>
        </div>
        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition flex items-center gap-2">
          <i className="fas fa-plus"></i>
          Add New Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input type="text" placeholder="Search products..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500" />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-slate-50 text-slate-600 text-sm font-medium rounded-xl border border-slate-100">Category</button>
            <button className="px-4 py-2 bg-slate-50 text-slate-600 text-sm font-medium rounded-xl border border-slate-100">Status</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center overflow-hidden">
                         <img src={`https://picsum.photos/seed/${product.id}/64/64`} alt="" className="object-cover w-full h-full" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{product.name}</div>
                        <div className="text-xs text-slate-500">ID: #{product.id}8291</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{product.category}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-800">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-slate-600 font-medium">{product.stock} units</span>
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${product.stock > 10 ? 'bg-indigo-500' : 'bg-rose-500'}`} 
                          style={{ width: `${Math.min(product.stock, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      product.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 
                      product.status === 'Out of Stock' ? 'bg-rose-50 text-rose-600' : 
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 transition">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 transition">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsView;
