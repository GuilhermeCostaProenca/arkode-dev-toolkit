import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Dumbbell, 
  Apple, 
  Pill, 
  Target,
  Zap,
  ArrowLeft,
  TrendingUp,
  Activity,
  Moon,
  Droplets
} from 'lucide-react';

export default function OrionHealth() {
  const navigate = useNavigate();

  const healthMetrics = [
    { label: 'Workouts This Week', value: 4, target: 5, icon: Dumbbell, color: 'text-[hsl(var(--health))]' },
    { label: 'Water Intake', value: 2.1, target: 3.0, icon: Droplets, color: 'text-blue-500', unit: 'L' },
    { label: 'Sleep Average', value: 7.2, target: 8.0, icon: Moon, color: 'text-purple-500', unit: 'h' },
    { label: 'Daily Steps', value: 8547, target: 10000, icon: Activity, color: 'text-orange-500' }
  ];

  const workouts = [
    { type: 'Upper Body', duration: '45min', calories: 320, completed: true, date: 'Today' },
    { type: 'Cardio', duration: '30min', calories: 280, completed: true, date: 'Yesterday' },
    { type: 'Legs', duration: '50min', calories: 350, completed: false, date: 'Tomorrow' }
  ];

  const medications = [
    { name: 'Vitamin D', dosage: '1000 IU', time: '08:00', taken: true },
    { name: 'Omega 3', dosage: '500mg', time: '08:00', taken: true },
    { name: 'Protein Shake', dosage: '25g', time: '19:00', taken: false }
  ];

  const habits = [
    { name: 'Morning Meditation', streak: 12, completed: true },
    { name: 'Read 30 minutes', streak: 8, completed: true },
    { name: 'No social media before 10am', streak: 5, completed: false },
    { name: 'Stretch before bed', streak: 15, completed: true }
  ];

  return (
    <div className="min-h-screen orion-grid-bg">
      <div className="orion-container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/orion')}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to ORION
            </Button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-[hsl(var(--health))]" />
              <div>
                <h1 className="text-3xl font-bold">ORION Health</h1>
                <p className="text-muted-foreground">Wellness & Routine Tracker</p>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-[hsl(var(--health))] border-[hsl(var(--health))]">
            Wellness Mode Active
          </Badge>
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {healthMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            const percentage = (metric.value / metric.target) * 100;
            
            return (
              <Card key={index} className="orion-card module-health">
                <CardContent className="py-6">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent className={`h-8 w-8 ${metric.color}`} />
                    <Badge variant="outline" className="text-xs">
                      {Math.round(percentage)}%
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{metric.label}</p>
                    <p className="text-2xl font-bold">
                      {typeof metric.value === 'number' && metric.value < 100 
                        ? metric.value.toFixed(1) 
                        : metric.value.toLocaleString()}
                      {metric.unit && <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>}
                    </p>
                    <Progress value={Math.min(percentage, 100)} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      Target: {metric.target.toLocaleString()}{metric.unit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workouts */}
          <Card className="orion-card">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Dumbbell className="h-5 w-5 text-[hsl(var(--health))]" />
                <span>Workout Schedule</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {workouts.map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{workout.type}</p>
                    <p className="text-sm text-muted-foreground">{workout.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{workout.duration}</p>
                    <p className="text-xs text-muted-foreground">{workout.calories} cal</p>
                  </div>
                  <div className="ml-4">
                    {workout.completed ? (
                      <Badge className="bg-[hsl(var(--health))]">Complete</Badge>
                    ) : (
                      <Badge variant="outline">Scheduled</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Medications */}
          <Card className="orion-card module-health">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Pill className="h-5 w-5 text-[hsl(var(--health))]" />
                <span>Medications & Supplements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {medications.map((med, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{med.name}</p>
                    <p className="text-xs text-muted-foreground">{med.dosage} at {med.time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {med.taken ? (
                      <Badge className="bg-[hsl(var(--health))] text-xs">Taken</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs">Pending</Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Habits */}
          <Card className="orion-card module-health">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-[hsl(var(--health))]" />
                <span>Daily Habits</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {habits.map((habit, index) => (
                <div key={index} className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{habit.name}</p>
                    {habit.completed ? (
                      <Zap className="h-4 w-4 text-[hsl(var(--health))]" />
                    ) : (
                      <div className="h-4 w-4 border-2 border-muted-foreground rounded-full" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {habit.streak} day streak
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {habit.completed ? 'Done' : 'Pending'}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card className="orion-card">
            <CardContent className="py-6">
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-[hsl(var(--health))] hover:bg-[hsl(var(--health))]/80">
                  <Dumbbell className="mr-2 h-4 w-4" />
                  Start Workout
                </Button>
                <Button variant="outline">
                  <Apple className="mr-2 h-4 w-4" />
                  Log Meal
                </Button>
                <Button variant="outline">
                  <Droplets className="mr-2 h-4 w-4" />
                  Add Water
                </Button>
                <Button variant="outline">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  View Progress
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}