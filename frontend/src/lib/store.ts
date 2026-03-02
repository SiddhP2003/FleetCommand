import { User, Vehicle, MaintenanceRecord} from '@/types';

const USERS_KEY = 'vm_users';
const VEHICLES_KEY = 'vm_vehicles';
const RECORDS_KEY = 'vm_records';
const AUTH_KEY = 'vm_auth';

function get<T>(key: string): T[] {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function set<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Seed admin user
function ensureAdmin() {
  const users = get<User>(USERS_KEY);
  if (!users.find(u => u.role === 'admin')) {
    users.push({
      id: 'admin-1',
      name: 'Admin',
      email: 'admin@autotrack.com',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date().toISOString(),
    });
    set(USERS_KEY, users);
  }
}
ensureAdmin();

// Auth
export function login(email: string, password: string): User | null {
  const users = get<User>(USERS_KEY);
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  }
  return null;
}

export function signup(name: string, email: string, password: string): User | null {
  const users = get<User>(USERS_KEY);
  if (users.find(u => u.email === email)) return null;
  const user: User = {
    id: crypto.randomUUID(),
    name,
    email,
    password,
    role: 'user',
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  set(USERS_KEY, users);
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function getCurrentUser(): User | null {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
}

// Vehicles
export function getVehicles(userId?: string): Vehicle[] {
  const vehicles = get<Vehicle>(VEHICLES_KEY);
  return userId ? vehicles.filter(v => v.userId === userId) : vehicles;
}

export function addVehicle(vehicle: Omit<Vehicle, 'id' | 'createdAt'>): Vehicle {
  const vehicles = get<Vehicle>(VEHICLES_KEY);
  const newVehicle: Vehicle = {
    ...vehicle,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  vehicles.push(newVehicle);
  set(VEHICLES_KEY, vehicles);
  return newVehicle;
}

// Service Records
export function getServiceRecords(filters?: {
  vehicleId?: string;
  userId?: string;
  serviceType?: string;
  dateFrom?: string;
  dateTo?: string;
}): ServiceRecord[] {
  let records = get<ServiceRecord>(RECORDS_KEY);
  if (filters?.vehicleId) records = records.filter(r => r.vehicleId === filters.vehicleId);
  if (filters?.userId) records = records.filter(r => r.userId === filters.userId);
  if (filters?.serviceType) records = records.filter(r => r.serviceType === filters.serviceType);
  if (filters?.dateFrom) records = records.filter(r => r.serviceDate >= filters.dateFrom!);
  if (filters?.dateTo) records = records.filter(r => r.serviceDate <= filters.dateTo!);
  return records.sort((a, b) => b.serviceDate.localeCompare(a.serviceDate));
}

export function addServiceRecord(record: Omit<ServiceRecord, 'id' | 'createdAt'>): ServiceRecord {
  const records = get<ServiceRecord>(RECORDS_KEY);
  const newRecord: ServiceRecord = {
    ...record,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  records.push(newRecord);
  set(RECORDS_KEY, records);
  return newRecord;
}

// Users (admin)
export function getAllUsers(): User[] {
  return get<User>(USERS_KEY);
}
