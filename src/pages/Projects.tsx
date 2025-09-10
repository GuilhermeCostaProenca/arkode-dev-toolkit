import { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { useProjectStore } from '@/store/projectStore';
import { apiService } from '@/lib/apiService';
import { Plus, FolderOpen, Clock } from 'lucide-react';

export default function Projects() {
  const { toast } = useToast();
  const { isAuthenticated } = useAuthStore();
  const { activeWorkspace } = useWorkspaceStore();
  const { projects, setProjects, addProject } = useProjectStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!activeWorkspace) {
    return (
      <div className="arkode-container py-8">
        <Card className="p-12 text-center max-w-md mx-auto">
          <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No workspace selected</h3>
          <p className="text-muted-foreground mb-4">
            Please select a workspace to view projects
          </p>
          <Button asChild>
            <Link to="/workspaces">Go to Workspaces</Link>
          </Button>
        </Card>
      </div>
    );
  }

  useEffect(() => {
    loadProjects();
  }, [activeWorkspace?.id]);

  const loadProjects = async () => {
    if (!activeWorkspace) return;
    
    try {
      const data = await apiService.getProjects(activeWorkspace.id);
      setProjects(data);
    } catch (error) {
      toast({
        title: "Failed to load projects",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim() || !activeWorkspace) return;

    setIsCreating(true);
    try {
      const project = await apiService.createProject(activeWorkspace.id, newProjectName.trim());
      addProject(project);
      setNewProjectName('');
      setIsModalOpen(false);
      
      toast({
        title: "Project created",
        description: `${project.name} has been created successfully`,
      });
    } catch (error) {
      toast({
        title: "Failed to create project",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
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

  return (
    <div className="arkode-container py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Projects</h1>
            <p className="text-muted-foreground">
              Projects in {activeWorkspace.name}
            </p>
          </div>
          
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Enter project name"
                    disabled={isCreating}
                    required
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsModalOpen(false)}
                    disabled={isCreating}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Creating...
                      </>
                    ) : (
                      'Create Project'
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <Card className="p-12 text-center">
            <FolderOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first project in {activeWorkspace.name}
            </p>
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card 
                key={project.id} 
                className="p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{project.name}</h3>
                    {project.client && (
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    )}
                  </div>
                  <StatusBadge status={project.status} />
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Updated recently</span>
                </div>

                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to={`/projects/${project.id}`}>
                    View Project
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}