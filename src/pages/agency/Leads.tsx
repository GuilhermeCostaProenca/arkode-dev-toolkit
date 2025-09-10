import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAgencyStore } from '@/store/agencyStore';
import { apiService } from '@/lib/apiService';
import { Plus, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Leads() {
  const { leads, setLeads, addLead } = useAgencyStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newLead, setNewLead] = useState({
    name: '',
    email: '',
    status: 'new' as const,
    next_step: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadLeads = async () => {
      try {
        const data = await apiService.getLeads();
        setLeads(data);
      } catch (error) {
        console.error('Failed to load leads:', error);
      }
    };

    loadLeads();
  }, [setLeads]);

  const handleCreateLead = async () => {
    if (!newLead.name.trim() || !newLead.email.trim()) return;

    try {
      const lead = await apiService.createLead(newLead);
      addLead(lead);
      setNewLead({ name: '', email: '', status: 'new', next_step: '' });
      setIsCreateOpen(false);
      
      toast({
        title: "Lead Created",
        description: "New lead has been added successfully",
      });
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create lead",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'contacted': return 'secondary';
      case 'interested': return 'outline';
      case 'closed': return 'destructive';
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
                <Users className="mr-3 h-8 w-8 text-primary" />
                Leads Management
              </h1>
              <p className="text-muted-foreground">
                Track and manage potential clients
              </p>
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Lead
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Lead</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newLead.name}
                      onChange={(e) => setNewLead(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Lead name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newLead.email}
                      onChange={(e) => setNewLead(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="contact@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newLead.status}
                      onValueChange={(value: any) => setNewLead(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="interested">Interested</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="next_step">Next Step</Label>
                    <Input
                      id="next_step"
                      value={newLead.next_step}
                      onChange={(e) => setNewLead(prev => ({ ...prev, next_step: e.target.value }))}
                      placeholder="Schedule discovery call"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateLead}>
                      Create Lead
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Leads ({leads.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {leads.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Next Step</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{lead.next_step}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No leads yet</p>
                <p className="text-sm">Create your first lead to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}