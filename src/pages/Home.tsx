import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { apiService } from '@/lib/apiService';
import { config } from '@/lib/config';
import { useAuthStore } from '@/store/authStore';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { Activity, Folder, Settings } from 'lucide-react';

export default function Home() {
  const { user } = useAuthStore();
  const { activeWorkspace } = useWorkspaceStore();
  const [healthStatus, setHealthStatus] = useState<'loading' | 'online' | 'offline'>('loading');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        await apiService.health();
        setHealthStatus('online');
      } catch (error) {
        setHealthStatus('offline');
      }
    };

    checkHealth();
  }, []);

  if (!user) {
    return (
      <div className="arkode-container py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to {config.APP_NAME}
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Professional development tools for modern teams
          </p>
          <Button size="lg" asChild>
            <Link to="/login">Get Started</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="arkode-container py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user.name.split(' ')[0]}
          </h1>
          <p className="text-muted-foreground">
            {activeWorkspace ? `Working in ${activeWorkspace.name}` : 'Select a workspace to get started'}
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Backend Status */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">Backend Status</h3>
              </div>
              {healthStatus === 'loading' ? (
                <LoadingSpinner size="sm" />
              ) : (
                <StatusBadge status={healthStatus} />
              )}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">API URL:</span>
                <span className="font-mono text-xs">{config.API_URL}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mode:</span>
                <span className={config.MOCK_API ? 'text-warning' : 'text-success'}>
                  {config.MOCK_API ? 'Mock' : 'Live'}
                </span>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Folder className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Quick Actions</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/workspaces">
                  Go to Workspaces
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/projects">
                  Go to Projects
                </Link>
              </Button>
            </div>
          </Card>

          {/* Settings */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">System</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" size="sm" asChild className="w-full justify-start">
                <Link to="/settings">
                  Settings
                </Link>
              </Button>
              <div className="text-xs text-muted-foreground">
                Version 1.0.0
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="text-center py-8 text-muted-foreground">
            <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No recent activity</p>
            <p className="text-sm">Start working on projects to see your activity here</p>
          </div>
        </Card>
      </div>
    </div>
  );
}