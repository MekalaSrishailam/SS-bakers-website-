import React from 'react';
import { useBakery } from '../../context/BakeryContext';
import { Download, TrendingUp, IndianRupee, ShoppingBag, PieChart, Sparkles, RefreshCw, Layers } from 'lucide-react';
import { formatINR } from '../../utils/currency';

export const AnalyticsView: React.FC = () => {
  const { getAnalytics, exportSalesReportCSV, addNotification } = useBakery();
  const analytics = getAnalytics();

  const handleSimulatePOSSync = () => {
    addNotification(
      'success',
      'POS Terminal Synchronized',
      'Square / Toast POS ledger synced with SS Bakers cloud records. 0 discrepancies.'
    );
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-amber-950 dark:text-stone-100">
            Performance Analytics & Growth Intelligence
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Real-time daily ticket yields, top-selling pastry volumes, and waste-minimization forecasts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* POS Sync Action */}
          <button
            onClick={handleSimulatePOSSync}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-amber-900 text-xs font-semibold shadow-2xs"
            title="Sync with physical POS counter terminal"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
            <span>POS Cloud Sync</span>
          </button>

          {/* Export Sales CSV */}
          <button
            onClick={exportSalesReportCSV}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 dark:bg-amber-700 dark:hover:bg-amber-600 text-white text-xs font-semibold shadow-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export Sales CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Daily Revenue */}
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Today's Net Revenue
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-stone-800 text-amber-800 dark:text-amber-400">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-mono-numbers text-2xl sm:text-3xl font-bold text-amber-950 dark:text-amber-100">
              {formatINR(analytics.todayRevenue)}
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14.2% vs same weekday last week
            </p>
          </div>
        </div>

        {/* Card 2: Orders Processed */}
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Orders Handled
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-stone-800 text-amber-800 dark:text-amber-400">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-mono-numbers text-2xl sm:text-3xl font-bold text-amber-950 dark:text-amber-100">
              {analytics.todayOrdersCount}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              100% hearth fulfillment on-schedule
            </p>
          </div>
        </div>

        {/* Card 3: Average Order Value */}
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Avg Order Value
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-stone-800 text-amber-800 dark:text-amber-400">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-mono-numbers text-2xl sm:text-3xl font-bold text-amber-950 dark:text-amber-100">
              {formatINR(analytics.averageOrderValue)}
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1">
              Solid multi-item basket cross-sell
            </p>
          </div>
        </div>

        {/* Card 4: Total Bakes Sold */}
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Pastries & Loaves Sold
            </span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-stone-800 text-amber-800 dark:text-amber-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <div className="font-mono-numbers text-2xl sm:text-3xl font-bold text-amber-950 dark:text-amber-100">
              {analytics.totalBakesSold}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              From 6:00 AM morning bake batch
            </p>
          </div>
        </div>

      </div>

      {/* Popular Dishes & Demand Forecasting Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Popular Dishes Breakdown */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-display text-base font-bold text-amber-950 dark:text-stone-100 mb-1">
              Top-Selling Bakes & Viennoiserie
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Real-time volume ranking and revenue contribution
            </p>

            <div className="space-y-3">
              {analytics.topSellingItems.map((item, idx) => {
                const maxCount = analytics.topSellingItems[0]?.count || 1;
                const percentage = Math.round((item.count / maxCount) * 100);

                return (
                  <div key={item.title} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                        <span className="font-mono text-stone-400 text-[11px]">0{idx + 1}.</span>
                        <span className="truncate max-w-[180px] sm:max-w-xs">{item.title}</span>
                      </span>
                      <span className="font-mono-numbers font-medium text-stone-600 dark:text-stone-400">
                        {item.count} sold ({formatINR(item.revenue)})
                      </span>
                    </div>
                    {/* Visual Bar */}
                    <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-800 dark:bg-amber-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Demand Forecasting & Waste Minimization Engine */}
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 border border-stone-200 dark:border-stone-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-display text-base font-bold text-amber-950 dark:text-stone-100 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Demand Forecast & Waste Minimization</span>
              </h3>
              <span className="text-[10px] font-mono uppercase bg-amber-100 dark:bg-stone-800 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded">
                Predictive AI
              </span>
            </div>
            <p className="text-xs text-stone-500 mb-4">
              Calibrated on historical morning rush sell-through, weather, and sourdough levain proof cycles.
            </p>

            <div className="space-y-3">
              {analytics.demandForecasts.slice(0, 4).map((f) => (
                <div
                  key={f.item}
                  className="p-3 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/80 dark:border-stone-700 text-xs"
                >
                  <div className="flex items-center justify-between font-semibold text-stone-900 dark:text-stone-100 mb-1">
                    <span className="truncate">{f.item}</span>
                    <span className="font-mono text-amber-900 dark:text-amber-300 text-[11px]">
                      Est. Demand: ~{f.predictedDemand} units
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    {f.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
