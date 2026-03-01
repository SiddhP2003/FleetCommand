import React from 'react';
import { getAllUsers, getVehicles } from '@/lib/store';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminVehiclesPage = () => {
  const vehicles = getVehicles();
  const users = getAllUsers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Vehicles</h1>
      <Card className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vehicle #</TableHead>
              <TableHead>Manufacturer</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Year</TableHead>
              <TableHead>Owner</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No vehicles registered</TableCell></TableRow>
            ) : (
              vehicles.map(v => {
                const owner = users.find(u => u.id === v.userId);
                return (
                  <TableRow key={v.id}>
                    <TableCell className="font-mono">{v.vehicleNumber}</TableCell>
                    <TableCell>{v.manufacturer}</TableCell>
                    <TableCell>{v.model}</TableCell>
                    <TableCell>{v.year}</TableCell>
                    <TableCell className="text-muted-foreground">{owner?.name || 'Unknown'}</TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminVehiclesPage;
