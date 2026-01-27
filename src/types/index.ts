// Core Data Models for Chatman Concierge

export type EstateStatus = 'secure' | 'away' | 'at-home' | 'alert';
export type UserRole = 'owner' | 'chief-of-staff' | 'security-lead' | 'staff';
export type IncidentSeverity = 'critical' | 'warning' | 'info' | 'resolved' | 'alert';
export type RequestStatus = 'pending' | 'approved' | 'in-progress' | 'completed' | 'declined';
export type SceneType = 'arrival' | 'entertain' | 'night-lockdown' | 'travel' | 'storm-mode';

export interface Estate {
  id: string;
  name: string;
  address: string;
  status: EstateStatus;
  imageUrl?: string;
  lastActivity: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  estates: string[]; // Estate IDs
}

export interface Incident {
  id: string;
  estateId: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  category: 'security' | 'environmental' | 'system' | 'vendor';
  timestamp: string;
  acknowledged: boolean;
  acknowledgedBy?: string;
  attachments?: string[];
}

export interface Request {
  id: string;
  estateId: string;
  title: string;
  description: string;
  category: 'maintenance' | 'vendor' | 'purchase' | 'service' | 'approval';
  status: RequestStatus;
  requestedBy: string;
  assignedTo?: string;
  budget?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: string;
  name: string;
  category: 'pool' | 'landscaping' | 'hvac' | 'plumbing' | 'electrical' | 'cleaning' | 'other';
  contact: string;
  email: string;
  phone: string;
  rating: number;
  lastService?: string;
  notes?: string;
}

export interface Budget {
  id: string;
  estateId: string;
  category: string;
  allocated: number;
  spent: number;
  cardLast4?: string;
  period: 'monthly' | 'quarterly' | 'annual';
}

export interface ProofOfWork {
  id: string;
  requestId: string;
  vendorId: string;
  description: string;
  beforePhotos: string[];
  afterPhotos: string[];
  signature?: string;
  timestamp: string;
  completedBy: string;
}

export interface Scene {
  id: string;
  name: string;
  type: SceneType;
  description: string;
  icon: string;
  actions: SceneAction[];
}

export interface SceneAction {
  system: 'lighting' | 'climate' | 'audio' | 'security' | 'shades';
  action: string;
  value?: string | number;
}

export interface SystemStatus {
  perimeter: 'secure' | 'breach' | 'offline';
  doors: { total: number; open: number; locked: number };
  cameras: { total: number; online: number; offline: number };
  sensors: { total: number; active: number; triggered: number };
  climate: { temperature: number; humidity: number; mode: string };
  power: 'normal' | 'backup' | 'outage';
  water: 'normal' | 'leak-detected';
  fire: 'normal' | 'alarm' | 'test';
}

export interface ActivityItem {
  id: string;
  type: 'security' | 'request' | 'vendor' | 'system' | 'ai';
  title: string;
  description: string;
  timestamp: string;
  icon?: string;
  actionable?: boolean;
  actionLabel?: string;
}
