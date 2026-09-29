import React, { useState } from 'react';
import { useBakery } from '../../context/BakeryContext';
import { Product, ProductCategory, DietaryTag } from '../../types';
import { Plus, Edit2, Trash2, Search, Sparkles, Check, X, ArrowUpRight, Flame } from 'lucide-react';
import { formatINR } from '../../utils/currency';

export const ProductManagement: React.FC = () => {
  const { products, addProduct, updateProduct, deleteProduct, restockProduct } = useBakery();

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Form State for Adding New Product
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('artisan-bread');
  const [newPrice, setNewPrice] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newStock, setNewStock] = useState('15');
  const [newThreshold, setNewThreshold] = useState('5');
  const [newPrepTime, setNewPrepTime] = useState('20');
  const [newBadge, setNewBadge] = useState('');
  const [newDietary, setNewDietary] = useState<DietaryTag[]>([]);

  // Edit Product State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const availableDietary: DietaryTag[] = ['Vegan', 'Gluten-Free', 'Nut-Free', 'Dairy-Free', 'Organic', 'Eggless'];

  const handleDietaryToggle = (tag: DietaryTag, isEdit = false) => {
    if (isEdit && editingProduct) {
      const current = editingProduct.dietary || [];
      const updated = current.includes(tag) ? current.filter(t => t !== tag) : [...current, tag];
      setEditingProduct({ ...editingProduct, dietary: updated });
    } else {
      setNewDietary(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice || !newDescription) return;

    addProduct({
      title: newTitle.trim(),
      category: newCategory,
      price: parseFloat(newPrice) || 5.00,
      description: newDescription.trim(),
      imageUrl: newImageUrl.trim() || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
      dietary: newDietary,
      stock: parseInt(newStock, 10) || 10,
      lowStockThreshold: parseInt(newThreshold, 10) || 4,
      prepTimeMinutes: parseInt(newPrepTime, 10) || 15,
      badge: newBadge.trim() || undefined,
      inStock: (parseInt(newStock, 10) || 10) > 0,
      ingredients: ['Organic Flour', 'Filtered Water', 'Sea Salt', 'Natural Levain']
    });

    // Reset Form
    setNewTitle('');
    setNewPrice('');
    setNewDescription('');
    setNewImageUrl('');
    setNewBadge('');
    setNewDietary([]);
    setIsAdding(false);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.id, {
      title: editingProduct.title,
      category: editingProduct.category,
      price: Number(editingProduct.price),
      description: editingProduct.description,
      imageUrl: editingProduct.imageUrl,
      stock: Number(editingProduct.stock),
      lowStockThreshold: Number(editingProduct.lowStockThreshold),
      prepTimeMinutes: Number(editingProduct.prepTimeMinutes),
      badge: editingProduct.badge || undefined,
      dietary: editingProduct.dietary,
      inStock: Number(editingProduct.stock) > 0
    });

    setEditingProduct(null);
  };

  // Filtered list
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-amber-950 dark:text-stone-100">
            Hearth Catalog & Menu Management
          </h2>
          <p className="text-xs text-stone-500">
            Updates synchronize immediately across the customer storefront in real-time.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(prev => !prev)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-950 dark:bg-amber-700 dark:hover:bg-amber-600 text-white font-semibold text-xs shadow-xs transition-colors self-start sm:self-auto"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isAdding ? 'Close Form' : 'Add New Product'}</span>
        </button>
      </div>

      {/* Add New Product Form Section */}
      {isAdding && (
        <form
          onSubmit={handleCreateProduct}
          className="p-6 bg-white dark:bg-stone-900 rounded-3xl border border-amber-900/20 dark:border-stone-800 shadow-md space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
            <h3 className="font-display text-base font-bold text-amber-950 dark:text-stone-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>Create New Bakery Item</span>
            </h3>
            <span className="text-[11px] text-stone-400">All fields update dynamic state instantly</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                Product Title *
              </label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Sourdough Cranberry Walnut Boule"
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:ring-1 focus:ring-amber-800"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                Category *
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              >
                <option value="artisan-bread">Artisan Breads</option>
                <option value="viennoiserie">Viennoiserie</option>
                <option value="patisserie">Pâtisserie</option>
                <option value="savoury">Savoury</option>
                <option value="beverages">Beverages</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                Price (₹ INR) *
              </label>
              <input
                type="number"
                step="1"
                min="10"
                required
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="240"
                className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                Initial Stock Batch *
              </label>
              <input
                type="number"
                min="0"
                required
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                Low Stock Threshold
              </label>
              <input
                type="number"
                min="1"
                value={newThreshold}
                onChange={(e) => setNewThreshold(e.target.value)}
                className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                Baking / Prep (mins)
              </label>
              <input
                type="number"
                min="1"
                value={newPrepTime}
                onChange={(e) => setNewPrepTime(e.target.value)}
                className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
              Description & Tasting Profile *
            </label>
            <textarea
              required
              rows={2}
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder="Describe fermentation, crumb, crust caramelization, and butter notes..."
              className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                Image URL (or leave blank for high-res pastry placeholder)
              </label>
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://... or /src/assets/images/..."
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-600 dark:text-stone-400 block mb-1">
                Editorial Badge (Optional)
              </label>
              <input
                type="text"
                value={newBadge}
                onChange={(e) => setNewBadge(e.target.value)}
                placeholder="e.g. Master Special, Limited Batch, Hearth Reserve"
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>
          </div>

          {/* Dietary tags */}
          <div>
            <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
              Dietary & Allergen Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {availableDietary.map(tag => (
                <button
                  type="button"
                  key={tag}
                  onClick={() => handleDietaryToggle(tag)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                    newDietary.includes(tag)
                      ? 'bg-amber-900 text-white border-amber-900 font-semibold'
                      : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-amber-900 hover:bg-amber-950 text-white shadow-xs"
            >
              Save to Catalog
            </button>
          </div>
        </form>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleSaveEdit}
            className="w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 border border-stone-200 dark:border-stone-800 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-display text-lg font-bold text-amber-950 dark:text-stone-100">
                Update Product: {editingProduct.title}
              </h3>
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-500 block mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingProduct.title}
                  onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-500 block mb-1">Category</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                >
                  <option value="artisan-bread">Artisan Breads</option>
                  <option value="viennoiserie">Viennoiserie</option>
                  <option value="patisserie">Pâtisserie</option>
                  <option value="savoury">Savoury</option>
                  <option value="beverages">Beverages</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-500 block mb-1">Price (₹ INR)</label>
                <input
                  type="number"
                  step="1"
                  required
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                  className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-500 block mb-1">Stock Count</label>
                <input
                  type="number"
                  required
                  value={editingProduct.stock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value, 10) || 0 })}
                  className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-500 block mb-1">Low Alert Limit</label>
                <input
                  type="number"
                  value={editingProduct.lowStockThreshold}
                  onChange={(e) => setEditingProduct({ ...editingProduct, lowStockThreshold: parseInt(e.target.value, 10) || 0 })}
                  className="w-full text-xs font-mono p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-500 block mb-1">Description</label>
              <textarea
                rows={2}
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-500 block mb-1">Image URL</label>
              <input
                type="text"
                value={editingProduct.imageUrl}
                onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                Dietary Options
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableDietary.map(tag => (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => handleDietaryToggle(tag, true)}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                      editingProduct.dietary?.includes(tag)
                        ? 'bg-amber-900 text-white border-amber-900 font-semibold'
                        : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 flex justify-end gap-2 border-t border-stone-100 dark:border-stone-800">
              <button
                type="button"
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-stone-200 dark:border-stone-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold rounded-xl bg-amber-900 text-white hover:bg-amber-950"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Interactive Product Table & Controls */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
        
        {/* Table Search & Filter Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row gap-3 justify-between items-center bg-stone-50/50 dark:bg-stone-800/40">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter items..."
              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['all', 'artisan-bread', 'viennoiserie', 'patisserie', 'savoury', 'beverages'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  categoryFilter === cat
                    ? 'bg-amber-950 dark:bg-amber-700 text-white font-semibold'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {cat === 'all' ? 'All Items' : cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 dark:bg-stone-800/80 text-stone-400 uppercase tracking-wider font-mono text-[10px] border-b border-stone-200 dark:border-stone-800">
              <tr>
                <th className="py-3 px-4">Item & Visual</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 font-mono-numbers">Price</th>
                <th className="py-3 px-4 font-mono-numbers">Stock Status</th>
                <th className="py-3 px-4">Quick Stock</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
              {filteredProducts.map((p) => {
                const isLow = p.stock <= p.lowStockThreshold && p.stock > 0;
                const isOut = p.stock <= 0;

                return (
                  <tr key={p.id} className="hover:bg-amber-50/30 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 dark:bg-stone-800 shrink-0">
                          <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">{p.title}</p>
                          <p className="text-[11px] text-stone-400 truncate max-w-xs">{p.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 capitalize">
                      {p.category.replace('-', ' ')}
                    </td>

                    <td className="py-3 px-4 font-mono-numbers font-bold text-amber-950 dark:text-amber-200">
                      {formatINR(p.price)}
                    </td>

                    <td className="py-3 px-4">
                      {isOut ? (
                        <span className="text-rose-600 font-semibold text-[11px]">Sold Out</span>
                      ) : isLow ? (
                        <span className="text-amber-600 font-semibold text-[11px] flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-500 animate-pulse" />
                          Low: {p.stock} units
                        </span>
                      ) : (
                        <span className="text-emerald-700 dark:text-emerald-400 font-medium text-[11px]">
                          {p.stock} units
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => restockProduct(p.id, 5)}
                          className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-[11px]"
                          title="Add 5 units"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => restockProduct(p.id, -1)}
                          disabled={p.stock <= 0}
                          className="px-2 py-1 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-semibold text-[11px] disabled:opacity-40"
                          title="Decrement 1 unit"
                        >
                          -1
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setEditingProduct(p)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-amber-900 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${p.title}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-rose-600 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
