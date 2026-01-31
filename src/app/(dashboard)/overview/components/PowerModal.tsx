'use client';

import { useState } from 'react';
import { Icon } from '@/components/icons';
import ModalShell from './ModalShell';

const LOADS = [
  { name: 'HVAC', kw: 4.2, color: 'bg-orange-400' },
  { name: 'Lighting', kw: 1.8, color: 'bg-yellow-400' },
  { name: 'Security', kw: 0.9, color: 'bg-blue-400' },
  { name: 'Other', kw: 2.1, color: 'bg-silver-500' },
];

const totalKw = LOADS.reduce((a, l) => a + l.kw, 0);

export default function PowerModal({ onClose }: { onClose: () => void }) {
  const [generatorStatus, setGeneratorStatus] = useState<'standby' | 'testing' | 'passed'>('standby');
  const [testProgress, setTestProgress] = useState(0);

  const runTest = async () => {
    setGeneratorStatus('testing');
    setTestProgress(0);
    for (let i = 1; i <= 10; i++) {
      await new Promise((r) => setTimeout(r, 300));
      setTestProgress(i * 10);
    }
    setGeneratorStatus('passed');
    setTimeout(() => setGeneratorStatus('standby'), 3000);
  };

  return (
    <ModalShell
      title="Power Grid"
      subtitle="All systems normal"
      icon="bolt"
      iconColor="text-yellow-400"
      onClose={onClose}
    >
      {/* Status Cards */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-surface-elevated border border-border rounded-xl p-3 text-center">
          <div className="w-8 h-8 rounded-lg bg-status-secure/10 flex items-center justify-center mx-auto mb-2">
            <Icon name="bolt" className="w-4 h-4 text-status-secure" />
          </div>
          <p className="text-sm text-text font-medium">Main Grid</p>
          <p className="text-[10px] text-status-secure">Connected</p>
        </div>
        <div className="bg-surface-elevated border border-border rounded-xl p-3 text-center">
          <div className="w-8 h-8 rounded-lg bg-yellow-400/10 flex items-center justify-center mx-auto mb-2">
            <Icon name="bolt" className="w-4 h-4 text-yellow-400" />
          </div>
          <p className="text-sm text-text font-medium">Generator</p>
          <p className={`text-[10px] ${
            generatorStatus === 'testing' ? 'text-yellow-400' :
            generatorStatus === 'passed' ? 'text-status-secure' : 'text-silver-500'
          }`}>
            {generatorStatus === 'testing' ? 'Testing...' :
             generatorStatus === 'passed' ? 'Test Passed' : 'Standby'}
          </p>
        </div>
        <div className="bg-surface-elevated border border-border rounded-xl p-3 text-center">
          <div className="w-8 h-8 rounded-lg bg-blue-400/10 flex items-center justify-center mx-auto mb-2">
            <Icon name="bolt" className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-sm text-text font-medium">Solar</p>
          <p className="text-[10px] text-blue-400">2.4 kW</p>
        </div>
      </div>

      {/* Generator Section */}
      <div className="rounded-xl bg-surface-elevated border border-border p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-silver-300 font-medium uppercase tracking-wider">Backup Generator</p>
          <button
            onClick={runTest}
            disabled={generatorStatus === 'testing'}
            className="px-3 py-1 rounded-lg text-xs font-medium bg-surface border border-border text-silver-400 hover:text-[#C9B370] hover:border-[#C9B370]/30 transition-all disabled:opacity-50"
          >
            {generatorStatus === 'testing' ? 'Running...' : 'Run Test'}
          </button>
        </div>

        {/* Fuel Gauge */}
        <div className="mb-2">
          <div className="flex items-center justify-between text-[10px] text-silver-500 mb-1">
            <span>Fuel Level</span>
            <span>94%</span>
          </div>
          <div className="h-2 bg-surface rounded-full overflow-hidden">
            <div className="h-full bg-[#C9B370] rounded-full" style={{ width: '94%' }} />
          </div>
        </div>

        {/* Test Progress */}
        {generatorStatus === 'testing' && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] text-silver-500 mb-1">
              <span>Test Progress</span>
              <span>{testProgress}%</span>
            </div>
            <div className="h-2 bg-surface rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full transition-all duration-300" style={{ width: `${testProgress}%` }} />
            </div>
          </div>
        )}

        {generatorStatus === 'passed' && (
          <div className="mt-3 rounded-lg bg-status-secure/10 border border-status-secure/20 p-2 text-center">
            <p className="text-xs text-status-secure font-medium">Generator Test Passed</p>
          </div>
        )}

        <p className="text-[10px] text-silver-600 mt-2">Last test: 3 days ago</p>
      </div>

      {/* Load Distribution */}
      <div className="rounded-xl bg-surface-elevated border border-border p-4">
        <p className="text-xs text-silver-300 font-medium uppercase tracking-wider mb-3">Load Distribution</p>
        <div className="space-y-2.5">
          {LOADS.map((load) => (
            <div key={load.name} className="flex items-center gap-3">
              <span className="text-xs text-silver-400 w-16">{load.name}</span>
              <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                <div className={`h-full ${load.color} rounded-full`} style={{ width: `${(load.kw / totalKw) * 100}%` }} />
              </div>
              <span className="text-xs text-silver-500 w-14 text-right">{load.kw} kW</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-silver-600 mt-3 text-right">Total: {totalKw.toFixed(1)} kW</p>
      </div>
    </ModalShell>
  );
}
