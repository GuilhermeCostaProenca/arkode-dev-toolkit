import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAgencyStore } from '@/store/agencyStore';
import { apiService } from '@/lib/apiService';
import { Plus, Building } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Clients() {
  const { clients, setClients, addClient } = useAgencyStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    segment: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await apiService.getClients();
        setClients(data);
      } catch (error) {
        console.error('Failed to load clients:', error);
      }
    };

    loadClients();
  }, [setClients]);

  const handleCreateClient = async () => {
    if (!newClient.name.trim() || !newClient.segment.trim()) return;

    try {
      const client = await apiService.createClient(newClient);
      addClient(client);
      setNewClient({ name: '', segment: '' });
      setIsCreateOpen(false);
      
      toast({
        title: "Client Created",
        description: "New client has been added successfully",
      });
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create client",
        variant: "destructive",
      });
    }
  };

  const getSegmentColor = (segment: string) => {
    switch (segment.toLowerCase()) {
      case 'enterprise': return 'default';
      case 'startup': return 'secondary';
      case 'smb': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="arkode-container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <Building className="mr-3 h-8 w-8 text-primary" />
                Client Portfolio
              </h1>
              <p className="text-muted-foreground">
                Manage existing client relationships
              </p>
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Client
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Client</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Client Name</Label>
                    <Input
                      id="name"
                      value={newClient.name}
                      onChange={(e) => setNewClient(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Client company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="segment">Segment</Label>
                    <Input
                      id="segment"
                      value={newClient.segment}
                      onChange={(e) => setNewClient(prev => ({ ...prev, segment: e.target.value }))}
                      placeholder="Enterprise, Startup, SMB, etc."
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateClient}>
                      Create Client
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.length > 0 ? (
            clients.map((client) => (
              <Card key={client.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <Badge variant={getSegmentColor(client.segment)}>
                      {client.segment}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Client since 2024
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8 text-muted-foreground">
                    <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No clients yet</p>
                    <p className="text-sm">Add your first client to get started</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}