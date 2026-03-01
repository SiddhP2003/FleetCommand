import React, { useState } from 'react';
import { getAllUsers, getVehicles, getServiceRecords } from '@/lib/store';
import { SERVICE_TYPES } from '@/types';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const AdminRecordsPage = () => {
  const [vehicleFilter, setVehicleFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  const records = getServiceRecords({
    vehicleId: vehicleFilter || undefined,
    serviceType: typeFilter || undefined,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
  });

  const vehicles = getVehicles();
  const users = getAllUsers();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">All Maintenance Records</h1>

      <Card className="glass-card p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <Label className="text-xs">Vehicle</Label>
            <Select value={vehicleFilter} onValueChange={v => setVehicleFilter(v === 'all' ? '' : v)}>
              <SelectTrigger><SelectValue placeholder="All vehicles" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All vehicles</SelectItem>
                {vehicles.map(v => <SelectItem key={v.id} value={v.id}>{v.manufacturer} {v.model} ({v.vehicleNumber})</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Service Type</Label>
            <Select value={typeFilter} onValueChange={v => setTypeFilter(v === 'all' ? '' : v)}>
              <SelectTrigger><SelectValue placeholder="All types" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                {SERVICE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">From</Label>
            <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">To</Label>
            <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
          </div>
        </div>
      </Card>

      <Card className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead className="text-right">Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No records found</TableCell></TableRow>
            ) : (
              records.map(r => {
                const vehicle = vehicles.find(v => v.id === r.vehicleId);
                const owner = users.find(u => u.id === r.userId);
                return (
                  <TableRow key={r.id}>
                    <TableCell className="text-sm">{r.serviceDate}</TableCell>
                    <TableCell className="text-sm">{vehicle ? `${vehicle.manufacturer} ${vehicle.model}` : 'Unknown'}</TableCell>
                    <TableCell><span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{r.serviceType}</span></TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-48 truncate">{r.description || '—'}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{owner?.name || 'Unknown'}</TableCell>
                    <TableCell className="text-right font-mono text-primary">${r.cost}</TableCell>
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

export default AdminRecordsPage;
