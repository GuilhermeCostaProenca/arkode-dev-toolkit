import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useKbStore } from '@/store/kbStore';
import { apiService } from '@/lib/apiService';
import { Book, Search, Plus, Tag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Knowledge() {
  const { 
    articles, 
    searchQuery, 
    selectedTags,
    setArticles, 
    addArticle,
    setSearchQuery,
    setSelectedTags,
    getFilteredArticles 
  } = useKbStore();
  
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    tags: '',
    markdown: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const data = await apiService.getArticles();
        setArticles(data);
      } catch (error) {
        console.error('Failed to load articles:', error);
      }
    };

    loadArticles();
  }, [setArticles]);

  const handleCreateArticle = async () => {
    if (!newArticle.title.trim()) return;

    try {
      const article = await apiService.createArticle({
        title: newArticle.title,
        tags: newArticle.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        markdown: newArticle.markdown
      });
      
      addArticle(article);
      setNewArticle({ title: '', tags: '', markdown: '' });
      setIsCreateOpen(false);
      
      toast({
        title: "Article Created",
        description: "Knowledge article has been created successfully",
      });
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: "Failed to create article",
        variant: "destructive",
      });
    }
  };

  const allTags = Array.from(new Set(articles.flatMap(article => article.tags)));
  const filteredArticles = getFilteredArticles();

  return (
    <div className="arkode-container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <Book className="mr-3 h-8 w-8 text-primary" />
                Knowledge Base
              </h1>
              <p className="text-muted-foreground">
                Organize and access your team's knowledge
              </p>
            </div>
            
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Article
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Create New Article</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Article title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      value={newArticle.tags}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="tag1, tag2, tag3"
                    />
                  </div>
                  <div>
                    <Label htmlFor="content">Content (Markdown)</Label>
                    <Textarea
                      id="content"
                      value={newArticle.markdown}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, markdown: e.target.value }))}
                      placeholder="Write your article content in Markdown..."
                      className="min-h-[200px]"
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleCreateArticle}>
                      Create Article
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {allTags.length > 0 && (
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filter by tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={selectedTags.includes(tag) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => {
                          if (selectedTags.includes(tag)) {
                            setSelectedTags(selectedTags.filter(t => t !== tag));
                          } else {
                            setSelectedTags([...selectedTags, tag]);
                          }
                        }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {article.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Updated: {new Date(article.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8 text-muted-foreground">
                    <Book className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    {articles.length === 0 ? (
                      <>
                        <p>No articles yet</p>
                        <p className="text-sm">Create your first knowledge article</p>
                      </>
                    ) : (
                      <>
                        <p>No articles match your search</p>
                        <p className="text-sm">Try adjusting your search terms or filters</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}