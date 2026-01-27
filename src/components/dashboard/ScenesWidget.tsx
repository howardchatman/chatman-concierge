'use client';

import { mockScenes } from '@/data/mockData';

export default function ScenesWidget() {
  return (
    <div className="card-elevated">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text">Quick Scenes</h3>
        <button className="text-xs text-silver hover:text-silver-200 transition-colors">Customize</button>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {mockScenes.slice(0, 4).map((scene) => (
          <button
            key={scene.id}
            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-surface border border-border hover:border-silver/30 hover:bg-surface-overlay transition-all group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">{scene.icon}</span>
            <div className="text-center">
              <p className="text-sm text-text font-medium">{scene.name}</p>
              <p className="text-xs text-text-muted">{scene.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
