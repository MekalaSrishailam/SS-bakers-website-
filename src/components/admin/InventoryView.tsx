import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { InventoryItem } from '../../types';
import { AlertTriangle, Package, Check, RefreshCw, Truck, ArrowUpRight } from 'lucide-react';
import { formatINR } from '../../utils/currency';

export const InventoryView: React.FC = () => {
  const { inventory, reorderSupply, lowStockSupplies, lowStockProducts, restockProduct } = useBakery();
  const [selectedSupply, setSelectedSupply] = useState<InventoryItem | null>(null);
  const [reorderAmount, setReorderAmount] = useState('25');

  const handleOrderSupply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSupply) return;
    const amount = parseFloat(reorderAmount) || 20;
    reorderSupply(selectedSupply.id, amount);
    setSelectedSupply(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-amber-950 dark:text-stone-100">
            Raw Supplies & Digital Inventory Ordering
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Automated threshold surveillance for French flours, cultured butter, Valrhona cocoa, and eco-packaging.
          </p>
        </div>
      </div>

      {/* Critical Stock Alerts Banner if any item is low */}
      {(lowStockSupplies.length > 0 || lowStockProducts.length > 0) && (
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs space-y-3">
          <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200 text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 animate-pulse" />
            <span>Automated Inventory Warnings ({lowStockSupplies.length + lowStockProducts.length} items flagged)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Supplies low */}
            {lowStockSupplies.map(sup => (
              <div key={sup.id} className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-amber-300 dark:border-amber-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">{sup.name}</span>
                  <span className="text-stone-500 text-[11px]">
                    Current: <strong className="text-rose-600 font-mono">{sup.currentStock} {sup.unit}</strong> (Min Threshold: {sup.minThreshold} {sup.unit})
                  </span>
                </div>
                <button
                  onClick={() => setSelectedSupply(sup)}
                  className="px-2.5 py-1.5 rounded-lg bg-amber-900 hover:bg-amber-950 text-white font-semibold text-[11px] shrink-0"
                >
                  Order Restock
                </button>
              </div>
            ))}

            {/* Pastries low */}
            {lowStockProducts.map(prod => (
              <div key={prod.id} className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-amber-300 dark:border-amber-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900 dark:text-stone-100 block">{prod.title}</span>
                  <span className="text-stone-500 text-[11px]">
                    Storefront Shelf: <strong className="text-amber-700 font-mono">{prod.stock} units</strong> remaining
                  </span>
                </div>
                <button
                  onClick={() => restockProduct(prod.id, 10)}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-900 text-white font-semibold text-[11px] shrink-0"
                >
                  Bake +10
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Supplies Table */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
        <div className="p-4 sm:p-5 border-b border-stone-100 dark:border-stone-800 flex justify-between items-center bg-stone-50/50 dark:bg-stone-800/40">
          <h3 className="font-display text-sm font-bold text-amber-950 dark:text-stone-100">
            Certified Ingredient Stock Levels
          </h3>
          <span className="text-xs text-stone-400">
            {inventory.length} certified suppliers linked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 dark:bg-stone-800/80 text-stone-400 uppercase tracking-wider font-mono text-[10px] border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="py-3 px-4">Supply Material</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 font-mono-numbers">Current Stock</th>
                <th className="py-3 px-4 font-mono-numbers">Min Buffer</th>
                <th className="py-3 px-4">Supplier Partner</th>
                <th className="py-3 px-4 font-mono-numbers">Unit Cost</th>
                <th className="py-3 px-4 text-right">Digital Order</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
              {inventory.map((item) => {
                const isLow = item.currentStock <= item.minThreshold;

                return (
                  <tr key={item.id} className="hover:bg-amber-50/20 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100">
                      {item.name}
                    </td>
                    <td className="py-3 px-4 uppercase text-[11px] text-stone-500">
                      {item.category}
                    </td>
                    <td className="py-3 px-4 font-mono-numbers">
                      <span className={isLow ? 'text-rose-600 font-bold' : 'text-stone-900 dark:text-stone-100'}>
                        {item.currentStock} {item.unit}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono-numbers text-stone-500">
                      {item.minThreshold} {item.unit}
                    </td>
                    <td className="py-3 px-4 text-stone-600 dark:text-stone-400">
                      {item.supplier}
                    </td>
                    <td className="py-3 px-4 font-mono-numbers text-stone-600 dark:text-stone-400">
                      {formatINR(item.costPerUnit)} / {item.unit}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedSupply(item)}
                        className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-amber-800 text-stone-700 dark:text-stone-300 hover:text-amber-900 font-medium text-xs transition-colors"
                      >
                        Reorder Supply
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital Supply Order Modal */}
      {selectedSupply && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleOrderSupply}
            className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4"
          >
            <div>
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-stone-800 flex items-center justify-center text-amber-800 mb-3">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-display text-lg font-bold text-amber-950 dark:text-stone-100">
                Transmit Supply Purchase Order
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Order directly from partner: <strong className="text-stone-800 dark:text-stone-200">{selectedSupply.supplier}</strong>
              </p>
            </div>

            <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-xl space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-500">Material:</span>
                <span className="font-bold">{selectedSupply.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Current Stock:</span>
                <span className="font-mono">{selectedSupply.currentStock} {selectedSupply.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Cost:</span>
                <span className="font-mono">{formatINR(selectedSupply.costPerUnit)} per {selectedSupply.unit}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                Quantity to Replenish ({selectedSupply.unit})
              </label>
              <input
                type="number"
                min="5"
                step="1"
                required
                value={reorderAmount}
                onChange={(e) => setReorderAmount(e.target.value)}
                className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>

            <div className="flex items-center justify-between text-xs pt-2 font-mono">
              <span className="text-stone-500">Estimated PO Cost:</span>
              <span className="font-bold text-sm text-amber-900 dark:text-amber-200">
                {formatINR((parseFloat(reorderAmount) || 0) * selectedSupply.costPerUnit)}
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedSupply(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-amber-900 hover:bg-amber-950 text-white shadow-xs"
              >
                Confirm Dispatch Order
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
