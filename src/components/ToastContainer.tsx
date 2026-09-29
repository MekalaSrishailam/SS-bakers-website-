import React from 'react';
import { useBakery } from '../context/BakeryContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { notifications, dismissNotification } = useBakery();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {notifications.map((notif) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />,
          error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
          info: <Info className="w-5 h-5 text-amber-800 shrink-0" />
        };

        const bgColors = {
          success: 'bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100',
          warning: 'bg-amber-50/95 dark:bg-amber-950/90 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100',
          error: 'bg-rose-50/95 dark:bg-rose-950/90 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-100',
          info: 'bg-stone-50/95 dark:bg-stone-900/95 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100'
        };

        return (
          <div
            key={notif.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-sm transition-all duration-200 ${bgColors[notif.type]}`}
          >
            {icons[notif.type]}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold tracking-tight">{notif.title}</div>
              <div className="text-xs opacity-90 mt-0.5 leading-relaxed">{notif.message}</div>
            </div>
            <button
              onClick={() => dismissNotification(notif.id)}
              className="opacity-60 hover:opacity-100 p-0.5 rounded transition-opacity"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
