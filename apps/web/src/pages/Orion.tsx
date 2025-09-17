import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  GraduationCap, 
  Heart, 
  Users, 
  Home, 
  DollarSign, 
  Code,
  Zap,
  Activity,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function Orion() {
  const navigate = useNavigate();
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);

  const modules = [
    {
      id: 'study',
      title: 'ORION Study',
      description: 'College dashboard, grades, exams, study schedules',
      icon: GraduationCap,
      route: '/orion/study',
      theme: 'module-study',
      status: 'Active',
      stats: { items: 12, progress: 85 }
    },
    {
      id: 'health',
      title: 'ORION Health',
      description: 'Gym tracking, diet, medication, habits',
      icon: Heart,
      route: '/orion/health',
      theme: 'module-health',
      status: 'Active',
      stats: { items: 8, progress: 72 }
    },
    {
      id: 'social',
      title: 'ORION Social',
      description: 'LinkedIn/Instagram planner, post suggestions',
      icon: Users,
      route: '/orion/social',
      theme: 'module-social',
      status: 'Active',
      stats: { items: 15, progress: 60 }
    },
    {
      id: 'home',
      title: 'ORION Home',
      description: 'Smart home integration - lights, TV, Alexa, PC',
      icon: Home,
      route: '/orion/home',
      theme: 'module-home',
      status: 'Connected',
      stats: { items: 6, progress: 95 }
    },
    {
      id: 'finance',
      title: 'ORION Finance',
      description: 'Daily finances, bills, Gmail, tasks',
      icon: DollarSign,
      route: '/orion/finance',
      theme: 'module-finance',
      status: 'Active',
      stats: { items: 23, progress: 78 }
    },
    {
      id: 'studio',
      title: 'ARKODE Studio',
      description: 'Professional projects, clients, repos, sprints',
      icon: Code,
      route: '/studio',
      theme: 'module-studio',
      status: 'Professional',
      stats: { items: 9, progress: 90 }
    }
  ];

  const handleModuleClick = (module: any) => {
    navigate(module.route);
  };

  return (
    <div className="min-h-screen orion-grid-bg">
      {/* Hero Section */}
      <div className="orion-container py-12">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Brain className="h-16 w-16 text-primary glow-pulse" />
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-primary neural-pulse" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
            ORION OS
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Your Personal Life Operating System
          </p>
          <p className="text-sm text-muted-foreground/80">
            One intelligent brain, multiple specialized modules
          </p>
        </div>

        {/* System Status */}
        <div className="flex justify-center mb-12">
          <Card className="orion-card">
            <CardContent className="flex items-center space-x-6 py-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">System Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Neural Network: Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">6 Modules Connected</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {modules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Card
                key={module.id}
                className={`orion-module-card ${module.theme} float-animation cursor-pointer`}
                onClick={() => handleModuleClick(module)}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
                style={{ animationDelay: `${modules.indexOf(module) * 0.2}s` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <IconComponent className="h-8 w-8 text-primary" />
                        {hoveredModule === module.id && (
                          <div className="absolute inset-0 text-primary animate-ping">
                            <IconComponent className="h-8 w-8" />
                          </div>
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {module.status}
                        </Badge>
                      </div>
                    </div>
                    {hoveredModule === module.id && (
                      <ArrowRight className="h-5 w-5 text-primary animate-pulse" />
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {module.description}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {module.stats.items} items
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${module.stats.progress}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground">
                        {module.stats.progress}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6">Quick Actions</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="orion-glow"
              onClick={() => navigate('/orion/study')}
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Study Dashboard
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/orion/health')}
            >
              <Heart className="mr-2 h-5 w-5" />
              Health Tracker
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/studio')}
            >
              <Code className="mr-2 h-5 w-5" />
              Professional Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}