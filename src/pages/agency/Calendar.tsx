import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAgencyStore } from '@/store/agencyStore';
import { apiService } from '@/lib/apiService';
import { Plus, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Calendar() {
  const { calendar, setCalendar, addCalendarItem } = useAgencyStore();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    title: '',
    date: '',
    status: 'draft' as const
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadCalendar = async () => {
      try {
        const data = await apiService.getCalendar();
        setCalendar(data);
      } catch (error) {
        console.error('Failed to load calendar:', error);
      }
    };

    loadCalendar();
  }, [setCalendar]);

  const handleCreateItem = async () => {
    if (!newItem.title.trim() || !newItem.date.trim()) return;

    try {
      const item = await apiService.createCalendarItem(newItem);
      addCalendarItem(item);
      setNewItem({ title: '', date: '', status: 'draft' });
      setIsCreateOpen(false);
      
      toast({
        title: "Item Created",
        description: "New content item has been added to calendar",
      });
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create calendar item",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'secondary';
      case 'scheduled': return 'default';
      case 'published': return 'outline';
      default: return 'default';
    }
  };

  const groupedItems = calendar.reduce((acc, item) => {
    const date = new Date(item.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof calendar>);

  return (
    <div className="arkode-container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <CalendarIcon className="mr-3 h-8 w-8 text-primary" />
                Content Calendar
              </h1>
              <p className="text-muted-foreground">
                Plan and schedule content creation
              </p>
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Content
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Content Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newItem.title}
                      onChange={(e) => setNewItem(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Content title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newItem.date}
                      onChange={(e) => setNewItem(prev => ({ ...prev, date: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={newItem.status}
                      onValueChange={(value: any) => setNewItem(prev => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateItem}>
                      Create Item
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="space-y-6">
          {Object.entries(groupedItems).length > 0 ? (
            Object.entries(groupedItems)
              .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
              .map(([date, items]) => (
                <Card key={date}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Clock className="mr-2 h-5 w-5" />
                      {date}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(item.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No content scheduled yet</p>
                  <p className="text-sm">Add your first content item to get started</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}