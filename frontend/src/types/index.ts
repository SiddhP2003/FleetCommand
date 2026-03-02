export interface User {
  id: number;
  vehicle_number: string;
  model: string;
  manufacturer: string;
  year: number;
  owner_id: number;
  is_admin: boolean;
}
  // id = Column(Integer, primary_key=True, index=True)
  //   name = Column(String(255), nullable=False)
  //   email = Column(String(255), unique=True, nullable=False)
  //   password = Column(String(255), nullable=False)
  //   is_admin = Column(Boolean, default=False)

export interface Vehicle {
  id: number;
  userId: number;
  vehicleNumber: string;
  model: string;
  manufacturer: string;
  year: number;
  createdAt: string;
}

export interface MaintenanceRecord {
  id: number;
  service_date: string;
  service_type: string;
  description: string;
  cost: number;
  vehicle_id: number;
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
