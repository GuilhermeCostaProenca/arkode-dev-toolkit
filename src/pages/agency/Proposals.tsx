import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAgencyStore } from '@/store/agencyStore';
import { apiService } from '@/lib/apiService';
import { Plus, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

export default function Proposals() {
  const { proposals, setProposals, addProposal } = useAgencyStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: '',
    status: 'draft' as const
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadProposals = async () => {
      try {
        const data = await apiService.getProposals();
        setProposals(data);
      } catch (error) {
        console.error('Failed to load proposals:', error);
      }
    };

    loadProposals();
  }, [setProposals]);

  const handleCreateProposal = async () => {
    if (!newProposal.title.trim()) return;

    try {
      const proposal = await apiService.createProposal(newProposal);
      addProposal(proposal);
      setNewProposal({ title: '', status: 'draft' });
      setIsCreateOpen(false);
      
      toast({
        title: "Proposal Created",
        description: "New proposal has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create proposal",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'sent': return 'default';
      case 'approved': return 'outline';
      case 'rejected': return 'destructive';
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
                <FileText className="mr-3 h-8 w-8 text-primary" />
                Proposals
              </h1>
              <p className="text-muted-foreground">
                Create and track project proposals
              </p>
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Proposal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Proposal</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newProposal.title}
                      onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Proposal title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newProposal.status}
                      onValueChange={(value: any) => setNewProposal(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="sent">Sent</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateProposal}>
                      Create Proposal
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposals.length > 0 ? (
            proposals.map((proposal) => (
              <Card key={proposal.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{proposal.title}</CardTitle>
                    <Badge variant={getStatusColor(proposal.status)}>
                      {proposal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Created recently
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/agency/proposals/${proposal.id}`}>
                        Edit
                      </Link>
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
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No proposals yet</p>
                    <p className="text-sm">Create your first proposal to get started</p>
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