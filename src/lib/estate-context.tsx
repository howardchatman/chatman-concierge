'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { SystemStatus, Incident, Request as ServiceRequest, Vendor, Budget, ActivityItem } from '@/types';

export interface EstateProfile {
  id: string;
  name: string;
  address: string;
  coverImage: string;
  status: 'secure' | 'away' | 'at-home' | 'alert';
  sqft: string;
  bedrooms: number;
  staff: number;
  lastActivity: string;
  systemStatus: SystemStatus;
  zones: { name: string; status: string; cameras: number; sensors: number }[];
  incidents: Incident[];
  requests: ServiceRequest[];
  vendors: Vendor[];
  budgets: Budget[];
  activity: ActivityItem[];
  aiInsight: string;
  aiSummary: string;
}

// ── Palm Beach Residence ─────────────────────────────────────────
const palmBeach: EstateProfile = {
  id: 'palm-beach',
  name: 'Palm Beach Residence',
  address: '1200 South Ocean Boulevard, Palm Beach, FL',
  coverImage: '/cc_h1.png',
  status: 'secure',
  sqft: '18,500',
  bedrooms: 7,
  staff: 12,
  lastActivity: '2 minutes ago',
  systemStatus: {
    perimeter: 'secure',
    doors: { total: 24, open: 2, locked: 22 },
    cameras: { total: 32, online: 31, offline: 1 },
    sensors: { total: 48, active: 48, triggered: 0 },
    climate: { temperature: 72, humidity: 45, mode: 'cooling' },
    power: 'normal',
    water: 'normal',
    fire: 'normal',
  },
  zones: [
    { name: 'Main Entrance', status: 'armed', cameras: 4, sensors: 6 },
    { name: 'East Wing', status: 'armed', cameras: 6, sensors: 8 },
    { name: 'West Wing', status: 'armed', cameras: 5, sensors: 7 },
    { name: 'Pool Area', status: 'armed', cameras: 8, sensors: 4 },
    { name: 'Guest House', status: 'armed', cameras: 4, sensors: 5 },
    { name: 'Garage Complex', status: 'armed', cameras: 6, sensors: 8 },
  ],
  incidents: [
    {
      id: 'pb-inc-1', estateId: 'palm-beach',
      title: 'Pool Area Motion Detected',
      description: 'Motion sensor triggered in pool area. Identified as landscaping crew.',
      severity: 'resolved', category: 'security',
      timestamp: '2024-01-27T10:30:00Z', acknowledged: true, acknowledgedBy: 'Security Team',
    },
    {
      id: 'pb-inc-2', estateId: 'palm-beach',
      title: 'Camera 7 Offline',
      description: 'East wing camera connection lost. Technician dispatched.',
      severity: 'warning', category: 'system',
      timestamp: '2024-01-27T09:15:00Z', acknowledged: true, acknowledgedBy: 'Chief of Security',
    },
    {
      id: 'pb-inc-3', estateId: 'palm-beach',
      title: 'HVAC Filter Replacement Due',
      description: 'Scheduled maintenance reminder for main unit filter replacement.',
      severity: 'info', category: 'environmental',
      timestamp: '2024-01-27T08:00:00Z', acknowledged: false,
    },
  ],
  requests: [
    {
      id: 'pb-req-1', estateId: 'palm-beach',
      title: 'Pool Maintenance - Weekly Service',
      description: 'Regular weekly pool cleaning and chemical balance check.',
      category: 'vendor', status: 'completed',
      requestedBy: 'System', assignedTo: 'Aqua Elite Services', budget: 450,
      createdAt: '2024-01-26T08:00:00Z', updatedAt: '2024-01-26T14:30:00Z',
    },
    {
      id: 'pb-req-2', estateId: 'palm-beach',
      title: 'Plumber - Guest Bath Leak Repair',
      description: 'Minor leak detected under guest bathroom sink. Scheduled for repair.',
      category: 'maintenance', status: 'in-progress',
      requestedBy: 'AI Concierge', assignedTo: 'Premier Plumbing', budget: 350,
      createdAt: '2024-01-27T07:00:00Z', updatedAt: '2024-01-27T10:00:00Z',
    },
    {
      id: 'pb-req-3', estateId: 'palm-beach',
      title: 'Approve Invoice - Landscape Design',
      description: 'Invoice #2847 from Verde Gardens for January landscape maintenance.',
      category: 'approval', status: 'pending',
      requestedBy: 'Chief of Staff', budget: 2800,
      createdAt: '2024-01-27T11:00:00Z', updatedAt: '2024-01-27T11:00:00Z',
    },
  ],
  vendors: [
    { id: 'v-1', name: 'Aqua Elite Services', category: 'pool', contact: 'Marcus Rivera', email: 'marcus@aquaelite.com', phone: '(561) 555-0123', rating: 4.9, lastService: '2024-01-26' },
    { id: 'v-2', name: 'Verde Gardens', category: 'landscaping', contact: 'Elena Vasquez', email: 'elena@verdegardens.com', phone: '(561) 555-0456', rating: 4.8, lastService: '2024-01-25' },
    { id: 'v-3', name: 'Premier Plumbing', category: 'plumbing', contact: 'David Chen', email: 'david@premierplumb.com', phone: '(561) 555-0789', rating: 4.7, lastService: '2024-01-15' },
    { id: 'v-4', name: 'Climate Control Pro', category: 'hvac', contact: 'Sarah Mitchell', email: 'sarah@climatepro.com', phone: '(561) 555-0321', rating: 4.9, lastService: '2024-01-10' },
  ],
  budgets: [
    { id: 'pb-b-1', estateId: 'palm-beach', category: 'Pool & Spa', allocated: 5000, spent: 1800, cardLast4: '4521', period: 'monthly' },
    { id: 'pb-b-2', estateId: 'palm-beach', category: 'Landscaping', allocated: 8000, spent: 5600, cardLast4: '4521', period: 'monthly' },
    { id: 'pb-b-3', estateId: 'palm-beach', category: 'Repairs & Maintenance', allocated: 10000, spent: 2350, cardLast4: '7832', period: 'monthly' },
    { id: 'pb-b-4', estateId: 'palm-beach', category: 'Security Systems', allocated: 3000, spent: 450, cardLast4: '7832', period: 'monthly' },
  ],
  activity: [
    { id: 'pb-act-1', type: 'ai', title: 'AI Concierge filtered vendor call', description: 'Blocked unsolicited sales call from "Solar Solutions Inc."', timestamp: '10 minutes ago', icon: 'ai' },
    { id: 'pb-act-2', type: 'vendor', title: 'Pool service completed', description: 'Aqua Elite Services submitted proof-of-work with before/after photos.', timestamp: '2 hours ago', icon: 'pool', actionable: true, actionLabel: 'Review Photos' },
    { id: 'pb-act-3', type: 'request', title: 'Invoice awaiting approval', description: 'Verde Gardens - January Landscape Maintenance - $2,800', timestamp: '3 hours ago', icon: 'document', actionable: true, actionLabel: 'Approve & Pay' },
    { id: 'pb-act-4', type: 'security', title: 'Perimeter check complete', description: 'All 24 entry points verified secure. No anomalies detected.', timestamp: '4 hours ago', icon: 'shield' },
    { id: 'pb-act-5', type: 'system', title: 'Climate adjusted automatically', description: 'Temperature set to 72°F based on arrival prediction.', timestamp: '5 hours ago', icon: 'thermometer' },
  ],
  aiInsight: "Based on your schedule, I've pre-conditioned the master suite to 72°F and queued your preferred evening playlist. The landscaping crew finished early — photos are ready for your review.",
  aiSummary: "Today I filtered 2 unsolicited calls, coordinated the pool maintenance crew, and scheduled tomorrow's HVAC inspection. One invoice requires your approval and the landscaping photos are ready for review.",
};

// ── Aspen Mountain Lodge ─────────────────────────────────────────
const aspenLodge: EstateProfile = {
  id: 'aspen-lodge',
  name: 'Aspen Mountain Lodge',
  address: '500 Little Nell Road, Aspen, CO',
  coverImage: '/cc_h3.png',
  status: 'away',
  sqft: '12,200',
  bedrooms: 5,
  staff: 6,
  lastActivity: '3 days ago',
  systemStatus: {
    perimeter: 'secure',
    doors: { total: 16, open: 0, locked: 16 },
    cameras: { total: 20, online: 20, offline: 0 },
    sensors: { total: 32, active: 32, triggered: 0 },
    climate: { temperature: 58, humidity: 30, mode: 'heating' },
    power: 'normal',
    water: 'normal',
    fire: 'normal',
  },
  zones: [
    { name: 'Main Lodge Entry', status: 'armed', cameras: 4, sensors: 6 },
    { name: 'Great Room', status: 'armed', cameras: 3, sensors: 4 },
    { name: 'Ski Prep Room', status: 'armed', cameras: 2, sensors: 3 },
    { name: 'Hot Tub Terrace', status: 'armed', cameras: 4, sensors: 4 },
    { name: 'Wine Cellar', status: 'armed', cameras: 2, sensors: 6 },
    { name: 'Garage & Snowmobile Bay', status: 'armed', cameras: 5, sensors: 9 },
  ],
  incidents: [
    {
      id: 'as-inc-1', estateId: 'aspen-lodge',
      title: 'Snow Load Sensor Alert',
      description: 'Roof snow load sensor reading elevated. De-icing system activated automatically.',
      severity: 'resolved', category: 'environmental',
      timestamp: '2024-01-25T14:20:00Z', acknowledged: true, acknowledgedBy: 'Property Manager',
    },
    {
      id: 'as-inc-2', estateId: 'aspen-lodge',
      title: 'Driveway Heat Trace Active',
      description: 'Automated heated driveway system engaged due to incoming snowfall forecast.',
      severity: 'info', category: 'system',
      timestamp: '2024-01-25T06:00:00Z', acknowledged: true, acknowledgedBy: 'System',
    },
  ],
  requests: [
    {
      id: 'as-req-1', estateId: 'aspen-lodge',
      title: 'Chimney Inspection - Annual',
      description: 'Annual chimney sweep and inspection for all 3 fireplaces.',
      category: 'maintenance', status: 'pending',
      requestedBy: 'Property Manager', budget: 1200,
      createdAt: '2024-01-24T09:00:00Z', updatedAt: '2024-01-24T09:00:00Z',
    },
    {
      id: 'as-req-2', estateId: 'aspen-lodge',
      title: 'Hot Tub Winterization Check',
      description: 'Quarterly maintenance and chemical balance for outdoor hot tub.',
      category: 'vendor', status: 'completed',
      requestedBy: 'System', assignedTo: 'Alpine Spa Services', budget: 350,
      createdAt: '2024-01-20T10:00:00Z', updatedAt: '2024-01-22T16:00:00Z',
    },
  ],
  vendors: [
    { id: 'as-v-1', name: 'Alpine Spa Services', category: 'pool', contact: 'Jake Morrison', email: 'jake@alpinespa.com', phone: '(970) 555-0142', rating: 4.8, lastService: '2024-01-22' },
    { id: 'as-v-2', name: 'Summit Tree Care', category: 'landscaping', contact: 'Ryan Kowalski', email: 'ryan@summittree.com', phone: '(970) 555-0278', rating: 4.9, lastService: '2024-01-18' },
    { id: 'as-v-3', name: 'Mountain Hearth Co.', category: 'hvac', contact: 'Linda Park', email: 'linda@mtnhearth.com', phone: '(970) 555-0391', rating: 5.0, lastService: '2024-01-10' },
    { id: 'as-v-4', name: 'Elk Range Plumbing', category: 'plumbing', contact: 'Tom Briggs', email: 'tom@elkrange.com', phone: '(970) 555-0455', rating: 4.7, lastService: '2024-01-05' },
  ],
  budgets: [
    { id: 'as-b-1', estateId: 'aspen-lodge', category: 'Snow Removal & Grounds', allocated: 6000, spent: 4200, cardLast4: '9201', period: 'monthly' },
    { id: 'as-b-2', estateId: 'aspen-lodge', category: 'Heating & Firewood', allocated: 4500, spent: 3100, cardLast4: '9201', period: 'monthly' },
    { id: 'as-b-3', estateId: 'aspen-lodge', category: 'Spa & Hot Tub', allocated: 2000, spent: 700, cardLast4: '9201', period: 'monthly' },
    { id: 'as-b-4', estateId: 'aspen-lodge', category: 'Security Systems', allocated: 2500, spent: 600, cardLast4: '9201', period: 'monthly' },
  ],
  activity: [
    { id: 'as-act-1', type: 'system', title: 'Driveway heat trace activated', description: 'Automated de-icing engaged for forecasted 8" snowfall overnight.', timestamp: '6 hours ago', icon: 'thermometer' },
    { id: 'as-act-2', type: 'security', title: 'Perimeter sweep complete', description: 'All 20 cameras online. No anomalies at property boundary.', timestamp: '12 hours ago', icon: 'shield' },
    { id: 'as-act-3', type: 'vendor', title: 'Firewood delivery confirmed', description: 'Mountain Hearth Co. scheduled cord delivery for Friday AM.', timestamp: '1 day ago', icon: 'check', actionable: true, actionLabel: 'View Details' },
    { id: 'as-act-4', type: 'ai', title: 'AI flagged weather advisory', description: 'Winter storm watch issued for Pitkin County through Saturday.', timestamp: '1 day ago', icon: 'ai' },
    { id: 'as-act-5', type: 'system', title: 'Generator test completed', description: 'Backup generator monthly auto-test passed. Fuel at 94%.', timestamp: '3 days ago', icon: 'bolt' },
  ],
  aiInsight: "The lodge is in away mode with all systems nominal. A winter storm watch has been issued for Pitkin County — I've activated the heated driveway and verified the backup generator. Chimney inspection is pending your approval.",
  aiSummary: "While in away mode, I'm monitoring weather forecasts and managing automated systems. The driveway heat trace has been activated for incoming snow. Generator tested successfully. One chimney inspection awaits approval.",
};

// ── Manhattan Penthouse ──────────────────────────────────────────
const manhattanPenthouse: EstateProfile = {
  id: 'manhattan-penthouse',
  name: 'Manhattan Penthouse',
  address: '432 Park Avenue, New York, NY',
  coverImage: '/cc_h5.png',
  status: 'secure',
  sqft: '8,400',
  bedrooms: 4,
  staff: 4,
  lastActivity: '1 hour ago',
  systemStatus: {
    perimeter: 'secure',
    doors: { total: 8, open: 0, locked: 8 },
    cameras: { total: 12, online: 12, offline: 0 },
    sensors: { total: 18, active: 18, triggered: 0 },
    climate: { temperature: 70, humidity: 38, mode: 'heating' },
    power: 'normal',
    water: 'normal',
    fire: 'normal',
  },
  zones: [
    { name: 'Private Elevator Lobby', status: 'armed', cameras: 2, sensors: 3 },
    { name: 'Main Living Space', status: 'armed', cameras: 2, sensors: 3 },
    { name: 'Master Suite', status: 'armed', cameras: 1, sensors: 2 },
    { name: 'Terrace & Outdoor', status: 'armed', cameras: 4, sensors: 6 },
    { name: 'Service Entrance', status: 'armed', cameras: 2, sensors: 3 },
    { name: 'Wine Room', status: 'armed', cameras: 1, sensors: 1 },
  ],
  incidents: [
    {
      id: 'mp-inc-1', estateId: 'manhattan-penthouse',
      title: 'Building Fire Drill Notification',
      description: '432 Park management scheduled fire drill for Feb 3. Systems will be tested.',
      severity: 'info', category: 'system',
      timestamp: '2024-01-27T11:00:00Z', acknowledged: true, acknowledgedBy: 'Concierge Team',
    },
    {
      id: 'mp-inc-2', estateId: 'manhattan-penthouse',
      title: 'Terrace Door Sensor Recalibrated',
      description: 'Wind-triggered false alert resolved. Sensor sensitivity adjusted.',
      severity: 'resolved', category: 'security',
      timestamp: '2024-01-26T15:45:00Z', acknowledged: true, acknowledgedBy: 'Security Team',
    },
  ],
  requests: [
    {
      id: 'mp-req-1', estateId: 'manhattan-penthouse',
      title: 'Art Handler - Gallery Rotation',
      description: 'Coordinate with Sotheby\'s for Q1 art rotation. Three pieces arriving from storage.',
      category: 'service', status: 'pending',
      requestedBy: 'Chief of Staff', budget: 4500,
      createdAt: '2024-01-27T09:00:00Z', updatedAt: '2024-01-27T09:00:00Z',
    },
    {
      id: 'mp-req-2', estateId: 'manhattan-penthouse',
      title: 'Window Cleaning - Exterior',
      description: 'Quarterly exterior window service. Building-coordinated rope access.',
      category: 'vendor', status: 'in-progress',
      requestedBy: 'Property Manager', assignedTo: 'Skyline Window Co.', budget: 1800,
      createdAt: '2024-01-26T08:00:00Z', updatedAt: '2024-01-27T07:30:00Z',
    },
    {
      id: 'mp-req-3', estateId: 'manhattan-penthouse',
      title: 'Catering - Saturday Dinner',
      description: 'Private dinner for 8. Chef Laurent confirmed. Wine selection pending.',
      category: 'service', status: 'in-progress',
      requestedBy: 'AI Concierge', assignedTo: 'Laurent Privé', budget: 3200,
      createdAt: '2024-01-25T14:00:00Z', updatedAt: '2024-01-27T10:00:00Z',
    },
  ],
  vendors: [
    { id: 'mp-v-1', name: 'Skyline Window Co.', category: 'cleaning', contact: 'Michael Torres', email: 'michael@skylinewindow.com', phone: '(212) 555-0178', rating: 4.9, lastService: '2024-01-27' },
    { id: 'mp-v-2', name: 'Laurent Privé', category: 'other', contact: 'Chef Antoine Laurent', email: 'reservations@laurentprive.com', phone: '(212) 555-0234', rating: 5.0, lastService: '2024-01-20' },
    { id: 'mp-v-3', name: 'Park Avenue Florals', category: 'other', contact: 'Diana Osei', email: 'diana@parkaveflorals.com', phone: '(212) 555-0367', rating: 4.8, lastService: '2024-01-24' },
    { id: 'mp-v-4', name: 'Elite HVAC Manhattan', category: 'hvac', contact: 'Robert Kim', email: 'robert@elitehvacnyc.com', phone: '(212) 555-0412', rating: 4.7, lastService: '2024-01-12' },
  ],
  budgets: [
    { id: 'mp-b-1', estateId: 'manhattan-penthouse', category: 'Dining & Entertainment', allocated: 12000, spent: 7800, cardLast4: '3344', period: 'monthly' },
    { id: 'mp-b-2', estateId: 'manhattan-penthouse', category: 'Art & Interiors', allocated: 8000, spent: 4500, cardLast4: '3344', period: 'monthly' },
    { id: 'mp-b-3', estateId: 'manhattan-penthouse', category: 'Building Services', allocated: 3500, spent: 1800, cardLast4: '3344', period: 'monthly' },
    { id: 'mp-b-4', estateId: 'manhattan-penthouse', category: 'Security & Technology', allocated: 2500, spent: 900, cardLast4: '3344', period: 'monthly' },
  ],
  activity: [
    { id: 'mp-act-1', type: 'vendor', title: 'Window cleaning in progress', description: 'Skyline Window Co. team on-site. Floors 92-96 exterior access.', timestamp: '30 minutes ago', icon: 'document', actionable: true, actionLabel: 'View Status' },
    { id: 'mp-act-2', type: 'ai', title: 'Saturday dinner confirmed', description: 'Chef Laurent confirmed for 8 guests. Wine pairing from cellar recommended.', timestamp: '1 hour ago', icon: 'ai', actionable: true, actionLabel: 'Review Menu' },
    { id: 'mp-act-3', type: 'request', title: 'Floral arrangement delivered', description: 'Park Avenue Florals - weekly arrangement for entry and living room.', timestamp: '3 hours ago', icon: 'check' },
    { id: 'mp-act-4', type: 'security', title: 'Elevator access log clear', description: 'No unauthorized access attempts. 4 verified entries today.', timestamp: '4 hours ago', icon: 'shield' },
    { id: 'mp-act-5', type: 'system', title: 'Air filtration cycled', description: 'HEPA system completed daily purge cycle. Air quality index: Excellent.', timestamp: '6 hours ago', icon: 'thermometer' },
  ],
  aiInsight: "The art rotation from Sotheby's is pending your approval — three pieces arriving from climate-controlled storage. Chef Laurent is confirmed for Saturday's dinner and I've suggested a Burgundy pairing from the cellar inventory. Building fire drill is scheduled for Feb 3.",
  aiSummary: "Today I confirmed Saturday's private dinner, coordinated the window cleaning team with building management, and arranged the weekly floral delivery. The art handler request awaits your approval and a wine pairing recommendation is ready.",
};

// ── Estate Map ───────────────────────────────────────────────────
const estateMap: Record<string, EstateProfile> = {
  'palm-beach': palmBeach,
  'aspen-lodge': aspenLodge,
  'manhattan-penthouse': manhattanPenthouse,
};

export const allEstates = [palmBeach, aspenLodge, manhattanPenthouse];

// ── Context ──────────────────────────────────────────────────────
interface EstateContextType {
  estate: EstateProfile | null;
  selectEstate: (id: string) => void;
}

const EstateContext = createContext<EstateContextType>({
  estate: null,
  selectEstate: () => {},
});

export function EstateProvider({ children }: { children: ReactNode }) {
  const [estate, setEstate] = useState<EstateProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('selectedEstateId');
      if (saved && estateMap[saved]) return estateMap[saved];
    }
    return palmBeach; // default
  });

  const selectEstate = (id: string) => {
    const selected = estateMap[id];
    if (selected) {
      setEstate(selected);
      localStorage.setItem('selectedEstateId', id);
    }
  };

  return (
    <EstateContext.Provider value={{ estate, selectEstate }}>
      {children}
    </EstateContext.Provider>
  );
}

export function useEstate() {
  return useContext(EstateContext);
}
