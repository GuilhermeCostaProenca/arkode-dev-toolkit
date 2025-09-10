import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAgencyStore } from '@/store/agencyStore';
import { useEffect } from 'react';
import { apiService } from '@/lib/apiService';
import { Users, Building, FileText, Calendar } from 'lucide-react';

export default function Agency() {
  const { leads, clients, proposals, calendar, setLeads, setClients, setProposals, setCalendar } = useAgencyStore();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [leadsData, clientsData, proposalsData, calendarData] = await Promise.all([
          apiService.getLeads(),
          apiService.getClients(),
          apiService.getProposals(),
          apiService.getCalendar()
        ]);
        
        setLeads(leadsData);
        setClients(clientsData);
        setProposals(proposalsData);
        setCalendar(calendarData);
      } catch (error) {
        console.error('Failed to load agency data:', error);
      }
    };

    loadData();
  }, [setLeads, setClients, setProposals, setCalendar]);

  return (
    <div className="arkode-container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Agency Dashboard</h1>
          <p className="text-muted-foreground">
            Manage leads, clients, proposals, and content planning
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leads.length}</div>
              <p className="text-xs text-muted-foreground">
                {leads.filter(l => l.status === 'new').length} new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Clients</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground">
                Active partnerships
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Proposals</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{proposals.length}</div>
              <p className="text-xs text-muted-foreground">
                {proposals.filter(p => p.status === 'sent').length} pending review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Content</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calendar.length}</div>
              <p className="text-xs text-muted-foreground">
                Items this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Leads Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Track and manage potential clients
              </p>
              <Button asChild className="w-full">
                <Link to="/agency/leads">Manage Leads</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Client Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Manage existing client relationships
              </p>
              <Button asChild className="w-full">
                <Link to="/agency/clients">View Clients</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Proposals</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Create and track project proposals
              </p>
              <Button asChild className="w-full">
                <Link to="/agency/proposals">Manage Proposals</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Content Calendar</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Plan and schedule content creation
              </p>
              <Button asChild className="w-full">
                <Link to="/agency/calendar">View Calendar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}