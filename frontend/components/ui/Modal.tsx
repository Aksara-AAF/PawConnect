"use client";

import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-teal-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white dark:bg-teal-950 rounded-3xl shadow-2xl w-full max-w-lg border border-teal-100 dark:border-teal-800 overflow-hidden animate-in zoom-in-95 duration-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-teal-100 dark:border-teal-800 bg-slate-50/50 dark:bg-teal-900/50">
          <h2 className="text-xl font-bold tracking-tight text-teal-950 dark:text-teal-50">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-teal-100 dark:hover:bg-teal-800 rounded-full transition-colors text-teal-500 hover:text-teal-950 dark:hover:text-teal-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
