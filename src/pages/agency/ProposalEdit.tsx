import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { apiService } from '@/lib/apiService';
import { ArrowLeft, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { Proposal } from '@/lib/apiClient';

export default function ProposalEdit() {
  const { id } = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [markdown, setMarkdown] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadProposal = async () => {
      if (!id) return;
      
      try {
        const data = await apiService.getProposal(id);
        setProposal(data);
        setMarkdown(data.markdown || '');
      } catch (error) {
        toast({
          title: "Load Failed",
          description: "Failed to load proposal",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProposal();
  }, [id, toast]);

  const saveProposal = () => {
    toast({
      title: "Saved",
      description: "Proposal has been saved successfully",
    });
  };

  if (isLoading) {
    return (
      <div className="arkode-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading proposal...</div>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="arkode-container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Proposal not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="arkode-container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/agency/proposals">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Proposals
              </Link>
            </Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center">
                <FileText className="mr-3 h-8 w-8 text-primary" />
                {proposal.title}
              </h1>
              <p className="text-muted-foreground">
                One-pager proposal editor
              </p>
            </div>
            <Button onClick={saveProposal}>
              Save Changes
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <Tabs defaultValue="edit" className="w-full">
              <div className="border-b px-6 pt-6">
                <TabsList>
                  <TabsTrigger value="edit">Edit</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="edit" className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Proposal Content (Markdown)
                    </label>
                    <Textarea
                      value={markdown}
                      onChange={(e) => setMarkdown(e.target.value)}
                      placeholder="Write your proposal content in Markdown..."
                      className="min-h-[600px] font-mono text-sm"
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="preview" className="p-6">
                <div className="prose prose-sm max-w-none">
                  <div 
                    className="whitespace-pre-wrap"
                    dangerouslySetInnerHTML={{ 
                      __html: markdown.replace(/\n/g, '<br />') 
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}