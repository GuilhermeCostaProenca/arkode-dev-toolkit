import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';
import { useProjectStore } from '@/store/projectStore';
import { apiService } from '@/lib/apiService';
import { BarChart3, Calendar, FileText, List, Plus, Settings, Sparkles } from 'lucide-react';

export default function ProjectView() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { isAuthenticated } = useAuthStore();
  const { currentProject, setCurrentProject } = useProjectStore();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    if (!id) return;
    
    try {
      const project = await apiService.getProject(id);
      setCurrentProject(project);
    } catch (error) {
      toast({
        title: "Failed to load project",
        description: error instanceof Error ? error.message : "Project not found",
        variant: "destructive",
      });
      setCurrentProject(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="arkode-container py-8">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (!currentProject) {
    return (
      <div className="arkode-container py-8">
        <Card className="p-12 text-center max-w-md mx-auto">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">Project not found</h3>
          <p className="text-muted-foreground mb-4">
            The project you're looking for doesn't exist or has been deleted
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="arkode-container py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold">{currentProject.name}</h1>
              <StatusBadge status={currentProject.status} />
            </div>
            {currentProject.client && (
              <p className="text-muted-foreground">Client: {currentProject.client}</p>
            )}
          </div>
          
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="backlog">
              <List className="h-4 w-4 mr-2" />
              Backlog
            </TabsTrigger>
            <TabsTrigger value="spec">
              <Sparkles className="h-4 w-4 mr-2" />
              Spec
            </TabsTrigger>
            <TabsTrigger value="sprints">
              <Calendar className="h-4 w-4 mr-2" />
              Sprints
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Stories</p>
                    <p className="text-2xl font-bold">{currentProject.stats.stories}</p>
                  </div>
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Tasks</p>
                    <p className="text-2xl font-bold">{currentProject.stats.tasks}</p>
                  </div>
                  <List className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completion</p>
                    <p className="text-2xl font-bold">67%</p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Sprints</p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                  <Calendar className="h-8 w-8 text-muted-foreground" />
                </div>
              </Card>
            </div>
            
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Project Timeline</h3>
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Timeline visualization (concept preview)</p>
              </div>
            </Card>
          </TabsContent>

          {/* Backlog Tab */}
          <TabsContent value="backlog" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Product Backlog</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Story
                </Button>
              </div>
              <div className="text-center py-12 text-muted-foreground">
                <List className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No stories in backlog</p>
                <p className="text-sm">Add your first user story to get started</p>
              </div>
            </Card>
          </TabsContent>

          {/* Spec Tab */}
          <TabsContent value="spec" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">AI-Powered Specifications</h3>
                <Button size="sm" variant="outline">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Spec
                </Button>
              </div>
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>AI specification generation</p>
                <p className="text-sm">Concept preview based on user stories</p>
              </div>
            </Card>
          </TabsContent>

          {/* Sprints Tab */}
          <TabsContent value="sprints" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Sprint Board</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Sprint
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {['To Do', 'In Progress', 'Review', 'Done'].map((status) => (
                  <Card key={status} className="p-4 bg-muted/50">
                    <h4 className="font-medium mb-3">{status}</h4>
                    <div className="min-h-[200px] text-center text-muted-foreground text-sm">
                      Drop tasks here
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
