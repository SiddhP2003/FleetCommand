import React, { useState, useEffect } from 'react';
import { User, Vehicle, MaintenanceRecord} from '@/types';
import { useAuth } from '@/contexts/AuthContext';
//import { getVehicles, addVehicle, getServiceRecords } from '@/lib/store';
import api from "src/api";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Car, Plus, Wrench, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';


  // id = Column(Integer, primary_key=True)
  //   service_date = Column(Date, nullable=False)
  //   service_type = Column(String(100), nullable=False)
  //   description = Column(String(255))
  //   cost = Column(Float, nullable=False)
  //   vehicle_id = Column(Integer, ForeignKey("vehicles.id"), nullable=False)
// interface User {
//    id: number;
//   vehicle_number: string;
//   model: string;
//   manufacturer: string;
//   year: number;
//   owner_id: number;
// }
// interface Vehicle {
//   id: string;
//   userId: string;
//   vehicleNumber: string;
//   model: string;
//   manufacturer: string;
//   year: number;
//   createdAt: string;
// }

// interface MaintenanceRecord {
//   id: number;
//   service_date: string;
//   service_type: string;
//   description: string;
//   cost: number;
//   vehicle_id: number;
// }

const UserDashboard = () => {
  const { user } = useAuth();

  // const vehicles = getVehicles(user?.id);
  // const records = getServiceRecords({ userId: user?.id });
  const [vehicles, createVehicles] = useState<Vehicle[]>([]);
  const [maintenanceRecords, createMaintenanceRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {

        const vehicleRes = await api.get("/vehicles")
        const maintenanceRes = await api.get("/maintenance/");

        createVehicles(vehicleRes.data)
        createMaintenanceRecords(maintenanceRes.data)

      } catch(error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

      fetchData();
    }, []);

   const totalCost = maintenanceRecords.reduce((sum, r) => sum + r.cost, 0);

   if (loading) {
    return <div> Loading... </div>
   }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="glass-card stat-glow">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10"><Car className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">{vehicles.length}</p>
                <p className="text-sm text-muted-foreground">Vehicles</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10"><Wrench className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">{maintenanceRecords.length}</p>
                <p className="text-sm text-muted-foreground">Services</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-md bg-primary/10"><DollarSign className="h-5 w-5 text-primary" /></div>
              <div>
                <p className="text-2xl font-bold">${totalCost.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Services</h2>
        <Link to="/vehicles">
          <Button variant="outline" size="sm">View All Vehicles</Button>
        </Link>
      </div>

      {maintenanceRecords.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="py-8 text-center text-muted-foreground">
            No service records yet. Add a vehicle and start tracking!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {maintenanceRecords.slice(0, 5).map((record) => {
            const vehicle = vehicles.find(v => v.id === record.vehicle_id);
            return (
              <Card key={record.id} className="glass-card">
                <CardContent className="py-3 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{record.service_type}</p>
                    <p className="text-xs text-muted-foreground">
                      {vehicle.manufacturer} {vehicle.model} • {record.service_date}
                    </p>
                  </div>
                  <span className="text-sm font-mono text-primary">${record.cost}</span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
