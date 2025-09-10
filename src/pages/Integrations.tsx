import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { apiService } from '@/lib/apiService';
import { Github, Database, Link as LinkIcon, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Repo } from '@/lib/apiClient';

export default function Integrations() {
  const [githubConnected, setGithubConnected] = useState(false);
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load initial state - in a real app, this would check actual connection status
    setGithubConnected(true); // Mock as connected
    loadRepos();
  }, []);

  const loadRepos = async () => {
    try {
      const repoData = await apiService.getGitHubRepos();
      setRepos(repoData);
    } catch (error) {
      console.error('Failed to load repos:', error);
    }
  };

  const connectGitHub = async () => {
    setIsLoading(true);
    try {
      await apiService.connectGitHub();
      setGithubConnected(true);
      await loadRepos();
      toast({
        title: "GitHub Connected",
        description: "Successfully connected to GitHub",
      });
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect to GitHub",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const connectSupabase = () => {
    setSupabaseConnected(true);
    toast({
      title: "Supabase Connected",
      description: "Successfully connected to Supabase",
    });
  };

  return (
    <div className="arkode-container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <LinkIcon className="mr-3 h-8 w-8 text-primary" />
            Integrations
          </h1>
          <p className="text-muted-foreground">
            Connect external services to enhance your workflow
          </p>
        </div>

        <div className="space-y-8">
          {/* GitHub Integration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Github className="h-8 w-8" />
                  <div>
                    <CardTitle>GitHub</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Connect your GitHub repositories
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={githubConnected ? "default" : "secondary"}>
                    {githubConnected ? "Connected" : "Not Connected"}
                  </Badge>
                  {!githubConnected && (
                    <Button onClick={connectGitHub} disabled={isLoading}>
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            {githubConnected && (
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-semibold">Your Repositories</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {repos.map((repo) => (
                      <Card key={repo.id} className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">{repo.name}</h5>
                            <p className="text-sm text-muted-foreground">{repo.full_name}</p>
                          </div>
                          <Button size="sm" variant="ghost">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Supabase Integration */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Database className="h-8 w-8" />
                  <div>
                    <CardTitle>Supabase</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Connect your Supabase database
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge variant={supabaseConnected ? "default" : "secondary"}>
                    {supabaseConnected ? "Connected" : "Not Connected"}
                  </Badge>
                  {!supabaseConnected && (
                    <Button onClick={connectSupabase}>
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            {supabaseConnected && (
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-semibold">Database Status</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">5</div>
                        <p className="text-sm text-muted-foreground">Tables</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">12</div>
                        <p className="text-sm text-muted-foreground">Functions</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">3</div>
                        <p className="text-sm text-muted-foreground">Policies</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Coming Soon */}
          <Card className="opacity-60">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>More Integrations Coming Soon</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Slack, Discord, Notion, and more...
                  </p>
                </div>
                <Badge variant="outline">Coming Soon</Badge>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}