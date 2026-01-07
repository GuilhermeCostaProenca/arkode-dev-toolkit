import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useToast } from '@/hooks/use-toast';
import { useAuthStore } from '@/store/authStore';
import { config, setMockMode } from '@/lib/config';
import { Settings as SettingsIcon, Database, Trash2, User } from 'lucide-react';

export default function Settings() {
  const { toast } = useToast();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [isMockMode, setIsMockMode] = useState(config.MOCK_API);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleMockModeToggle = (enabled: boolean) => {
    setIsMockMode(enabled);
    setMockMode(enabled);
    
    toast({
      title: "Data mode updated",
      description: `Switched to ${enabled ? 'Portfolio Demo' : 'Live'} data. Page will reload.`,
    });
  };

  const handleClearCache = () => {
    // Clear localStorage except for auth
    const authData = localStorage.getItem('arkode-auth');
    localStorage.clear();
    if (authData) {
      localStorage.setItem('arkode-auth', authData);
    }
    
    // Reload page to clear Zustand stores
    window.location.reload();
    
    toast({
      title: "Cache cleared",
      description: "All cached data has been cleared",
    });
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  return (
    <div className="arkode-container py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your {config.APP_NAME} preferences and demo configuration
          </p>
        </div>

        <div className="space-y-6">
          {/* User Settings */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <User className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">User Profile</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>
              
              <div className="border-t pt-4">
                <Button variant="outline" onClick={handleLogout}>
                  Sign Out
                </Button>
              </div>
            </div>
          </Card>

          {/* API Configuration */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Database className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Data Configuration</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="mock-mode" className="text-base font-medium">
                    Use Demo Data
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Load curated data used for portfolio previews and walkthroughs
                  </p>
                </div>
                <Switch
                  id="mock-mode"
                  checked={isMockMode}
                  onCheckedChange={handleMockModeToggle}
                />
              </div>
              
              <div className="space-y-2 p-4 bg-muted rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">API URL:</span>
                  <span className="font-mono">{config.API_URL}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Mode:</span>
                  <StatusBadge 
                    status={config.MOCK_API ? 'offline' : 'online'} 
                    className="ml-2"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* System Settings */}
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <SettingsIcon className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">System</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Clear Cache</p>
                  <p className="text-sm text-muted-foreground">
                    Remove all cached data and reset application state
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleClearCache}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear Cache
                </Button>
              </div>
              
              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="font-medium">Version</p>
                  <p className="text-sm text-muted-foreground">
                    {config.APP_NAME} v1.0.0
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Built with React + Vite
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 border-destructive">
            <div className="flex items-center space-x-2 mb-4">
              <Trash2 className="h-5 w-5 text-destructive" />
              <h3 className="font-semibold text-destructive">Danger Zone</h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Reset Application</p>
                  <p className="text-sm text-muted-foreground">
                    Clear all data and sign out (irreversible in live mode)
                  </p>
                </div>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/';
                  }}
                >
                  Reset App
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
