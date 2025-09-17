import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/authStore';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { config } from '@/lib/config';
import { ChevronDown, Settings, LogOut } from 'lucide-react';

export function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { activeWorkspace, workspaces, setActiveWorkspace } = useWorkspaceStore();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="arkode-navbar fixed top-0 left-0 right-0 z-50">
      <div className="arkode-container flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">A</span>
          </div>
          <span className="font-semibold text-lg">{config.APP_NAME}</span>
        </Link>

        {/* Navigation Links */}
        {user && (
          <div className="flex items-center space-x-1">
            <Button 
              variant={isActive('/') ? 'secondary' : 'ghost'} 
              size="sm" 
              asChild
            >
              <Link to="/">Home</Link>
            </Button>
            <Button 
              variant={isActive('/studio') || isActive('/workspaces') || isActive('/projects') ? 'secondary' : 'ghost'} 
              size="sm" 
              asChild
            >
              <Link to="/workspaces">Studio</Link>
            </Button>
            <Button 
              variant={isActive('/agency') ? 'secondary' : 'ghost'} 
              size="sm" 
              asChild
            >
              <Link to="/agency">Agency</Link>
            </Button>
            <Button 
              variant={isActive('/orion') ? 'secondary' : 'ghost'} 
              size="sm" 
              asChild
            >
              <Link to="/orion">ORION</Link>
            </Button>
            <Button 
              variant={isActive('/knowledge') ? 'secondary' : 'ghost'} 
              size="sm" 
              asChild
            >
              <Link to="/knowledge">Knowledge</Link>
            </Button>
            <Button 
              variant={isActive('/integrations') ? 'secondary' : 'ghost'} 
              size="sm" 
              asChild
            >
              <Link to="/integrations">Integrations</Link>
            </Button>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Workspace Switcher */}
          {user && activeWorkspace && workspaces.length > 1 && (
            <div className="relative">
              <Button variant="outline" size="sm" className="pr-3">
                {activeWorkspace.name}
                <ChevronDown className="ml-2 h-3 w-3" />
              </Button>
              {/* TODO: Add dropdown for workspace switching */}
            </div>
          )}

          {/* User Menu */}
          {user ? (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/settings">
                  <Settings className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center space-x-2 pl-2 border-l border-border">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground text-xs font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-sm font-medium hidden sm:block">
                  {user.name}
                </span>
              </div>
            </div>
          ) : (
            <Button size="sm" asChild>
              <Link to="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}