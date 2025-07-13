'use client';

import { Toaster as SonnerToaster, toast as sonnerToast } from 'sonner';
import { Check, X } from 'lucide-react';

export function Toaster() {
  return <SonnerToaster position="top-center" richColors />;
}

export function toast(message: string, type: 'success' | 'error' = 'success') {
  if (type === 'success') {
    sonnerToast.success(message, {
      icon: <Check size={16} />,
    });
  } else {
    sonnerToast.error(message, {
      icon: <X size={16} />,
    });
  }
}