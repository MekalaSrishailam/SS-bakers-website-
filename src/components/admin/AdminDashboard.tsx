import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { ProductManagement } from './ProductManagement';
import { LiveKitchenKDS } from './LiveKitchenKDS';
import { InventoryView } from './InventoryView';
import { AnalyticsView } from './AnalyticsView';
import { ShieldCheck, UtensilsCrossed, Layers, BarChart3, Users, ExternalLink, AlertTriangle } from 'lucide-react';

interface AdminDashboardProps {
  onSwitchToCustomer: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onSwitchToCustomer }) => {
  const { currentUser, lowStockProducts, lowStockSupplies, orders } = useBakery();
  const [activeTab, setActiveTab] = useState<'products' | 'kds' | 'inventory' | 'analytics' | 'roles'>('products');

  const pendingOrdersCount = orders.filter(o => o.status === 'received' || o.status === 'baking').length;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-amber-900 text-white font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> Owner Administration
            </span>
            <span className="text-xs text-stone-500">SS Bakers Flagship Hearth</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-amber-950 dark:text-stone-100 mt-1">
            Business Command Center
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onSwitchToCustomer}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-amber-900 hover:border-amber-700 text-xs font-semibold shadow-2xs transition-colors"
          >
            <span>View Customer Storefront</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'products'
              ? 'bg-amber-950 dark:bg-amber-700 text-white shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <UtensilsCrossed className="w-4 h-4" />
          <span>Product Catalog & Menu</span>
          {lowStockProducts.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('kds')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'kds'
              ? 'bg-amber-950 dark:bg-amber-700 text-white shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Live Kitchen KDS</span>
          {pendingOrdersCount > 0 && (
            <span className="font-mono-numbers px-1.5 py-0.2 bg-amber-800 text-white rounded-full text-[10px]">
              {pendingOrdersCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'inventory'
              ? 'bg-amber-950 dark:bg-amber-700 text-white shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <span>Supplies & Inventory</span>
          {lowStockSupplies.length > 0 && (
            <span className="font-mono-numbers px-1.5 py-0.2 bg-rose-600 text-white rounded-full text-[10px]">
              {lowStockSupplies.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'analytics'
              ? 'bg-amber-950 dark:bg-amber-700 text-white shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Analytics & Reports</span>
        </button>

        <button
          onClick={() => setActiveTab('roles')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
            activeTab === 'roles'
              ? 'bg-amber-950 dark:bg-amber-700 text-white shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Staff Permissions</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="mt-8">
        {activeTab === 'products' && <ProductManagement />}
        {activeTab === 'kds' && <LiveKitchenKDS />}
        {activeTab === 'inventory' && <InventoryView />}
        {activeTab === 'analytics' && <AnalyticsView />}

        {/* Roles Subpanel */}
        {activeTab === 'roles' && (
          <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-xs space-y-6">
            <div>
              <h2 className="font-display text-xl font-bold text-amber-950 dark:text-stone-100">
                Multi-User Role Management & Permissions
              </h2>
              <p className="text-xs text-stone-500 mt-1">
                Granular access control policies configured across the bakery ecosystem.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-800 text-stone-400 uppercase tracking-wider font-mono text-[10px] border-b border-stone-200 dark:border-stone-800">
                  <tr>
                    <th className="py-3 px-4">Role Profile</th>
                    <th className="py-3 px-4">Catalog Modification</th>
                    <th className="py-3 px-4">Kitchen KDS Advance</th>
                    <th className="py-3 px-4">Inventory Reorder</th>
                    <th className="py-3 px-4">Financial Reports</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-stone-900 dark:text-stone-100">
                      Business Owner (Admin)
                    </td>
                    <td className="py-3.5 px-4 text-emerald-600 font-semibold">Full Access (Create/Update/Delete)</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-semibold">Full Access</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-semibold">Unrestricted PO Approval</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-semibold">Full CSV & Yield Export</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-stone-900 dark:text-stone-100">
                      Head Baker / Kitchen Staff
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">Stock Count Adjustment Only</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-semibold">Full KDS Status Control</td>
                    <td className="py-3.5 px-4 text-amber-600">Draft PO Request</td>
                    <td className="py-3.5 px-4 text-stone-400">Restricted</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-stone-900 dark:text-stone-100">
                      Customer Profile
                    </td>
                    <td className="py-3.5 px-4 text-stone-400">View Catalog Only</td>
                    <td className="py-3.5 px-4 text-stone-400">View Active Order Stepper</td>
                    <td className="py-3.5 px-4 text-stone-400">None</td>
                    <td className="py-3.5 px-4 text-stone-400">None (Own Invoices Only)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
