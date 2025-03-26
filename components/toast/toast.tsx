import { useEffect } from 'react';

export type ToastType = 'info' | 'warning' | 'error' | 'success';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastColor = (type: ToastType) => {
    switch (type) {
      case 'info':
        return 'alert-info';
      case 'warning':
        return 'alert-warning';
      case 'error':
        return 'alert-error';
      case 'success':
        return 'alert-success';
      default:
        return 'alert-info';
    }
  };

  return (
    <div className={`toast`}>
      <div className={`alert ${getToastColor(type)}`}>
        <span>{message}</span>
      </div>
    </div>
  );
} 