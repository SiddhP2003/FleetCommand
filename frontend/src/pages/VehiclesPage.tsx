import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getVehicles, addVehicle, getServiceRecords, addServiceRecord } from '@/lib/store';
import { Vehicle, SERVICE_TYPES } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Car, Plus, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

const VehiclesPage = () => {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(0);
  const vehicles = getVehicles(user?.id);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [addVehicleOpen, setAddVehicleOpen] = useState(false);
  const [addRecordVehicleId, setAddRecordVehicleId] = useState<string | null>(null);

  // Add vehicle form
  const [vNumber, setVNumber] = useState('');
  const [vModel, setVModel] = useState('');
  const [vManufacturer, setVManufacturer] = useState('');
  const [vYear, setVYear] = useState('');

  // Add record form
  const [sDate, setSDate] = useState('');
  const [sType, setSType] = useState('');
  const [sDesc, setSDesc] = useState('');
  const [sCost, setSCost] = useState('');

  const handleAddVehicle = () => {
    if (!vNumber.trim() || !vModel.trim() || !vManufacturer.trim() || !vYear.trim()) {
      toast.error('All fields are required');
      return;
    }
    addVehicle({
      userId: user!.id,
      vehicleNumber: vNumber.trim(),
      model: vModel.trim(),
      manufacturer: vManufacturer.trim(),
      year: parseInt(vYear),
    });
    toast.success('Vehicle added!');
    setVNumber(''); setVModel(''); setVManufacturer(''); setVYear('');
    setAddVehicleOpen(false);
    setRefresh(r => r + 1);
  };

  const handleAddRecord = () => {
    if (!sDate || !sType || !sCost) {
      toast.error('Date, type and cost are required');
      return;
    }
    addServiceRecord({
      vehicleId: addRecordVehicleId!,
      userId: user!.id,
      serviceDate: sDate,
      serviceType: sType,
      description: sDesc.trim(),
      cost: parseFloat(sCost),
    });
    toast.success('Service record added!');
    setSDate(''); setSType(''); setSDesc(''); setSCost('');
    setAddRecordVehicleId(null);
    setRefresh(r => r + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Vehicles</h1>
        <Dialog open={addVehicleOpen} onOpenChange={setAddVehicleOpen}>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Vehicle</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Vehicle</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Vehicle Number</Label><Input value={vNumber} onChange={e => setVNumber(e.target.value)} placeholder="e.g. ABC-1234" /></div>
              <div><Label>Manufacturer</Label><Input value={vManufacturer} onChange={e => setVManufacturer(e.target.value)} placeholder="e.g. Toyota" /></div>
              <div><Label>Model</Label><Input value={vModel} onChange={e => setVModel(e.target.value)} placeholder="e.g. Camry" /></div>
              <div><Label>Year</Label><Input type="number" value={vYear} onChange={e => setVYear(e.target.value)} placeholder="e.g. 2022" /></div>
              <Button onClick={handleAddVehicle} className="w-full">Add Vehicle</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {vehicles.length === 0 ? (
        <Card className="glass-card">
          <CardContent className="py-12 text-center text-muted-foreground">
            <Car className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p>No vehicles yet. Add your first vehicle to get started!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {vehicles.map(vehicle => {
            const records = getServiceRecords({ vehicleId: vehicle.id });
            const isExpanded = expandedId === vehicle.id;
            return (
              <Card key={vehicle.id} className="glass-card">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : vehicle.id)}>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-md bg-primary/10"><Car className="h-4 w-4 text-primary" /></div>
                      <div>
                        <p className="font-medium">{vehicle.manufacturer} {vehicle.model}</p>
                        <p className="text-xs text-muted-foreground">{vehicle.vehicleNumber} • {vehicle.year}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{records.length} records</span>
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 border-t border-border pt-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Maintenance History</h3>
                        <Dialog open={addRecordVehicleId === vehicle.id} onOpenChange={open => setAddRecordVehicleId(open ? vehicle.id : null)}>
                          <DialogTrigger asChild>
                            <Button size="sm" variant="outline"><Plus className="h-3 w-3 mr-1" /> Add Record</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader><DialogTitle>Add Service Record</DialogTitle></DialogHeader>
                            <div className="space-y-3">
                              <div><Label>Service Date</Label><Input type="date" value={sDate} onChange={e => setSDate(e.target.value)} /></div>
                              <div>
                                <Label>Service Type</Label>
                                <Select value={sType} onValueChange={setSType}>
                                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                                  <SelectContent>
                                    {SERVICE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div><Label>Description</Label><Textarea value={sDesc} onChange={e => setSDesc(e.target.value)} placeholder="Optional notes..." /></div>
                              <div><Label>Cost ($)</Label><Input type="number" step="0.01" value={sCost} onChange={e => setSCost(e.target.value)} placeholder="0.00" /></div>
                              <Button onClick={handleAddRecord} className="w-full">Add Record</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>

                      {records.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-3">No records yet</p>
                      ) : (
                        <div className="space-y-2">
                          {records.map(r => (
                            <div key={r.id} className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                              <div>
                                <p className="text-sm font-medium">{r.serviceType}</p>
                                <p className="text-xs text-muted-foreground">{r.serviceDate}{r.description ? ` • ${r.description}` : ''}</p>
                              </div>
                              <span className="text-sm font-mono text-primary">${r.cost}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VehiclesPage;
