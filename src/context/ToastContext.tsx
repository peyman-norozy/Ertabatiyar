import React, { createContext, useContext, useState, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'warning';

type ToastData = {
  visible: boolean;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastData>({
    visible: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: ToastType = 'success') => {
    setToast({
      visible: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast(prev => ({
        ...prev,
        visible: false,
      }));
    }, 2500);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast.visible && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
};

import { Toast } from '@/shared/ui';
