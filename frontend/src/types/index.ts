export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Vehicle {
  id: string;
  userId: string;
  vehicleNumber: string;
  model: string;
  manufacturer: string;
  year: number;
  createdAt: string;
}

export interface ServiceRecord {
  id: string;
  vehicleId: string;
  userId: string;
  serviceDate: string;
  serviceType: string;
  description: string;
  cost: number;
  createdAt: string;
}

export const SERVICE_TYPES = [
  'Oil Change',
  'Tire Replacement',
  'General Service',
  'Brake Service',
  'Battery Replacement',
  'Engine Repair',
  'Transmission Service',
  'AC Service',
  'Other',
] as const;
