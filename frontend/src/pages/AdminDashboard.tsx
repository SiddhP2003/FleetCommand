import React from 'react';
import { getAllUsers, getVehicles, getServiceRecords } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Users, Wrench, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const users = getAllUsers().filter(u => u.role !== 'admin');
  const vehicles = getVehicles();
  const records = getServiceRecords();
  const totalCost = records.reduce((sum, r) => sum + r.cost, 0);

  const stats = [
    { icon: Users, label: 'Users', value: users.length, color: 'text-primary' },
    { icon: Car, label: 'Vehicles', value: vehicles.length, color: 'text-primary' },
    { icon: Wrench, label: 'Services', value: records.length, color: 'text-primary' },
    { icon: DollarSign, label: 'Total Cost', value: `$${totalCost.toLocaleString()}`, color: 'text-primary' },
  ];

  // Service type breakdown
  const typeCounts: Record<string, number> = {};
  records.forEach(r => { typeCounts[r.serviceType] = (typeCounts[r.serviceType] || 0) + 1; });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <Card key={s.label} className="glass-card stat-glow">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-primary/10"><s.icon className="h-5 w-5 text-primary" /></div>
                <div>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="glass-card">
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Service Type Breakdown</h2>
          {Object.keys(typeCounts).length === 0 ? (
            <p className="text-sm text-muted-foreground">No records yet</p>
          ) : (
            <div className="space-y-3">
              {Object.entries(typeCounts).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="text-sm">{type}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${(count / records.length) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-mono text-muted-foreground w-8 text-right">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
