import React from 'react';
import { getAllUsers, getVehicles, getServiceRecords } from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminUsersPage = () => {
  const users = getAllUsers().filter(u => u.role !== 'admin');

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Users</h1>
      <Card className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vehicles</TableHead>
              <TableHead>Records</TableHead>
              <TableHead>Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No users registered</TableCell></TableRow>
            ) : (
              users.map(u => (
                <TableRow key={u.id}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell className="text-muted-foreground">{u.email}</TableCell>
                  <TableCell>{getVehicles(u.id).length}</TableCell>
                  <TableCell>{getServiceRecords({ userId: u.id }).length}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default AdminUsersPage;
