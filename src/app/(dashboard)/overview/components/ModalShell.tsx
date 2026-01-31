'use client';

import { useEffect } from 'react';
import { Icon } from '@/components/icons';

interface ModalShellProps {
  title: string;
  subtitle?: string;
  icon?: string;
  iconColor?: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export default function ModalShell({
  title,
  subtitle,
  icon,
  iconColor = 'text-[#C9B370]',
  onClose,
  children,
  footer,
  maxWidth = 'max-w-2xl',
}: ModalShellProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`bg-surface border border-border-light rounded-2xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto shadow-luxury`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-3">
            {icon && (
              <div className={`w-9 h-9 rounded-xl bg-surface-elevated border border-border flex items-center justify-center ${iconColor}`}>
                <Icon name={icon} className="w-5 h-5" />
              </div>
            )}
            <div>
              <h2 className="font-serif text-lg text-text">{title}</h2>
              {subtitle && <p className="text-xs text-silver-500">{subtitle}</p>}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-silver-500 hover:text-text hover:bg-surface-elevated transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-5 pb-5 pt-0">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
