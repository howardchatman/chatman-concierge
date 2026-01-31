'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/icons';

interface ActionStep {
  label: string;
  icon: string;
  duration: number;
}

interface ActionSimulationModalProps {
  title: string;
  icon: string;
  iconColor: string;
  steps: readonly ActionStep[];
  onClose: () => void;
}

export default function ActionSimulationModal({
  title,
  icon,
  iconColor,
  steps,
  onClose,
}: ActionSimulationModalProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;

    const runSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        if (cancelled) return;
        setCurrentStep(i);
        await new Promise((r) => setTimeout(r, steps[i].duration));
      }
      if (!cancelled) {
        setCurrentStep(steps.length);
        setIsComplete(true);
      }
    };

    const startDelay = setTimeout(() => runSteps(), 300);
    return () => {
      cancelled = true;
      clearTimeout(startDelay);
    };
  }, [steps]);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-border-light rounded-2xl w-full max-w-md shadow-luxury"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-col items-center pt-8 pb-4 px-6">
          <div className={`w-16 h-16 rounded-2xl bg-surface-elevated border border-border flex items-center justify-center mb-4 ${iconColor}`}>
            <Icon name={icon} className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-xl text-text">
            {isComplete ? title.replace('...', '') : title}
          </h2>
          {isComplete && (
            <p className="text-xs text-status-secure mt-1">All systems ready</p>
          )}
        </div>

        {/* Steps */}
        <div className="px-6 pb-2">
          <div className="space-y-1">
            {steps.map((step, i) => {
              const isDone = i < currentStep || isComplete;
              const isActive = i === currentStep && !isComplete;
              const isPending = i > currentStep && !isComplete;

              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 py-2.5 px-3 rounded-xl transition-all duration-300 ${
                    isActive ? 'bg-surface-elevated' : ''
                  }`}
                >
                  {/* Status indicator */}
                  <div className="w-7 h-7 flex-shrink-0 flex items-center justify-center">
                    {isDone ? (
                      <div className="w-7 h-7 rounded-full bg-status-secure/15 flex items-center justify-center">
                        <Icon name="check" className="w-4 h-4 text-status-secure" />
                      </div>
                    ) : isActive ? (
                      <div className="w-7 h-7 rounded-full border-2 border-[#C9B370]/30 border-t-[#C9B370] animate-spin" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-surface-elevated border border-border" />
                    )}
                  </div>

                  {/* Step icon + label */}
                  <span className={`${iconColor} transition-opacity ${isPending ? 'opacity-30' : 'opacity-100'}`}>
                    <Icon name={step.icon} className="w-4 h-4" />
                  </span>
                  <span className={`text-sm transition-all ${
                    isDone ? 'text-silver-400' : isActive ? 'text-text' : 'text-silver-600'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 pt-3">
          {isComplete ? (
            <div className="space-y-3">
              <div className="rounded-xl border border-[#C9B370]/20 bg-[#C9B370]/5 p-3 text-center">
                <p className="text-sm text-[#C9B370] font-medium">Simulation Complete</p>
              </div>
              <button
                onClick={onClose}
                className="w-full bg-[#C9B370] hover:bg-[#B8A460] text-obsidian py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-silver-400 border border-border hover:border-border-light hover:text-silver-200 transition-all"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
