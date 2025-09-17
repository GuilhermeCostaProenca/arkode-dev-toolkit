import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Target, 
  Trophy,
  Clock,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

export default function OrionStudy() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses = [
    {
      id: 'cs301',
      name: 'Data Structures',
      grade: 'A-',
      progress: 85,
      nextAssignment: 'Binary Trees Lab',
      dueDate: '2025-01-20',
      status: 'active'
    },
    {
      id: 'cs401',
      name: 'Software Engineering',
      grade: 'B+',
      progress: 78,
      nextAssignment: 'Project Proposal',
      dueDate: '2025-01-18',
      status: 'urgent'
    },
    {
      id: 'math305',
      name: 'Linear Algebra',
      grade: 'A',
      progress: 92,
      nextAssignment: 'Matrix Operations',
      dueDate: '2025-01-25',
      status: 'active'
    }
  ];

  const upcomingExams = [
    { course: 'Data Structures', date: '2025-01-30', type: 'Midterm', status: 'upcoming' },
    { course: 'Software Engineering', date: '2025-02-05', type: 'Final Project', status: 'urgent' },
    { course: 'Linear Algebra', date: '2025-02-10', type: 'Final Exam', status: 'upcoming' }
  ];

  const studySessions = [
    { subject: 'Binary Trees', duration: '2h', completed: true, date: 'Today' },
    { subject: 'Algorithms Review', duration: '1.5h', completed: false, date: 'Tomorrow' },
    { subject: 'Matrix Calculations', duration: '1h', completed: true, date: 'Yesterday' }
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
              <GraduationCap className="h-8 w-8 text-[hsl(var(--study))]" />
              <div>
                <h1 className="text-3xl font-bold">ORION Study</h1>
                <p className="text-muted-foreground">College Dashboard & Study Planner</p>
              </div>
            </div>
          </div>
          <Badge variant="outline" className="text-[hsl(var(--study))] border-[hsl(var(--study))]">
            Academic Excellence Mode
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="orion-card module-study">
            <CardContent className="flex items-center space-x-4 py-6">
              <Trophy className="h-10 w-10 text-[hsl(var(--study))]" />
              <div>
                <p className="text-2xl font-bold">3.7</p>
                <p className="text-sm text-muted-foreground">Current GPA</p>
              </div>
            </CardContent>
          </Card>
          <Card className="orion-card module-study">
            <CardContent className="flex items-center space-x-4 py-6">
              <BookOpen className="h-10 w-10 text-[hsl(var(--study))]" />
              <div>
                <p className="text-2xl font-bold">6</p>
                <p className="text-sm text-muted-foreground">Active Courses</p>
              </div>
            </CardContent>
          </Card>
          <Card className="orion-card module-study">
            <CardContent className="flex items-center space-x-4 py-6">
              <Target className="h-10 w-10 text-[hsl(var(--study))]" />
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Assignments Due</p>
              </div>
            </CardContent>
          </Card>
          <Card className="orion-card module-study">
            <CardContent className="flex items-center space-x-4 py-6">
              <Clock className="h-10 w-10 text-[hsl(var(--study))]" />
              <div>
                <p className="text-2xl font-bold">25h</p>
                <p className="text-sm text-muted-foreground">Study Time This Week</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Courses */}
          <div className="lg:col-span-2">
            <Card className="orion-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-[hsl(var(--study))]" />
                  <span>Current Courses</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course) => (
                  <Card 
                    key={course.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      course.status === 'urgent' ? 'border-orange-500' : 'border-border'
                    }`}
                    onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{course.name}</h3>
                          <p className="text-sm text-muted-foreground">{course.id.toUpperCase()}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={course.grade.startsWith('A') ? 'default' : 'secondary'}>
                            {course.grade}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      {selectedCourse === course.id && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Next Assignment</p>
                              <p className="text-sm text-muted-foreground">{course.nextAssignment}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium">Due Date</p>
                              <p className="text-sm text-muted-foreground">{course.dueDate}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Exams */}
            <Card className="orion-card module-study">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-[hsl(var(--study))]" />
                  <span>Upcoming Exams</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingExams.map((exam, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{exam.course}</p>
                      <p className="text-xs text-muted-foreground">{exam.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{exam.date}</p>
                      {exam.status === 'urgent' && (
                        <AlertCircle className="h-4 w-4 text-orange-500 ml-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Study Sessions */}
            <Card className="orion-card module-study">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-[hsl(var(--study))]" />
                  <span>Study Sessions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studySessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {session.completed ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{session.subject}</p>
                        <p className="text-xs text-muted-foreground">{session.date}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {session.duration}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}