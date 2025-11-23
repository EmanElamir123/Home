import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  action?: ToastAction;
}

interface ToastContextType {
  addToast: (message: string, type: 'success' | 'error' | 'info', options?: { action?: ToastAction }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info', options?: { action?: ToastAction }) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type, action: options?.action }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, options?.action ? 7000 : 4000); // Longer duration if there's an action
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    const handleToast = (event: CustomEvent) => {
      const { message, type, action } = event.detail;
      addToast(message, type, { action });
    };

    window.addEventListener('toast' as any, handleToast);
    return () => window.removeEventListener('toast' as any, handleToast);
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full px-4 md:px-0">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border animate-in slide-in-from-right min-w-[280px] ${
              toast.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : toast.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 flex-shrink-0" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 flex-shrink-0" />}
            {toast.type === 'info' && <AlertCircle className="w-5 h-5 flex-shrink-0" />}
            <span className="flex-1 text-sm">{toast.message}</span>
            {toast.action && (
              <button
                onClick={() => {
                  toast.action?.onClick();
                  removeToast(toast.id);
                }}
                className="px-3 py-1.5 rounded border-2 border-[#0288D1] text-[#0288D1] hover:bg-[#0288D1] hover:text-white transition-all text-sm font-medium min-w-[60px] flex items-center justify-center"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                {toast.action.label}
              </button>
            )}
            <button
              onClick={() => removeToast(toast.id)}
              className="flex-shrink-0 hover:opacity-70 transition-opacity flex items-center justify-center"
              style={{ minWidth: '44px', minHeight: '44px' }}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

export const toast = {
  success: (message: string, action?: ToastAction) => {
    const event = new CustomEvent('toast', { detail: { message, type: 'success', action } });
    window.dispatchEvent(event);
  },
  error: (message: string, action?: ToastAction) => {
    const event = new CustomEvent('toast', { detail: { message, type: 'error', action } });
    window.dispatchEvent(event);
  },
  info: (message: string, action?: ToastAction) => {
    const event = new CustomEvent('toast', { detail: { message, type: 'info', action } });
    window.dispatchEvent(event);
  }
};
