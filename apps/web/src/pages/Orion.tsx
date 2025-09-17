import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useOrionStore } from '@/store/orionStore';
import { apiService } from '@/lib/apiService';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Bot, FileText, Calendar, List, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Orion() {
  const { currentSession, artifacts, addMessage, addArtifact } = useOrionStore();
  const [isLoading, setIsLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const [selectedArtifact, setSelectedArtifact] = useState<any>(null);
  const { toast } = useToast();

  const generateArtifact = async (type: string, prompt?: string) => {
    setIsLoading(true);
    try {
      const artifact = await apiService.generateArtifact(type, prompt);
      addArtifact(artifact);
      addMessage(`Generated ${type} artifact`, 'assistant');
      setSelectedArtifact(artifact);
      toast({
        title: "Artifact Generated",
        description: `Successfully generated ${type} artifact`,
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate artifact",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = () => {
    if (!messageInput.trim()) return;
    
    addMessage(messageInput, 'user');
    setMessageInput('');
    
    // Simulate AI response
    setTimeout(() => {
      addMessage("I understand. How can I help you with your project?", 'assistant');
    }, 1000);
  };

  return (
    <div className="arkode-container py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Bot className="mr-3 h-8 w-8 text-primary" />
            ORION AI Assistant
          </h1>
          <p className="text-muted-foreground">
            Your personal AI for generating backlogs, proposals, and content plans
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Chat with ORION</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                  {currentSession?.messages.length ? (
                    currentSession.messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className="text-xs opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Start a conversation with ORION</p>
                        <p className="text-sm">Ask me to generate artifacts or help with your projects</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Panel */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Generate</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => generateArtifact('backlog')}
                  disabled={isLoading}
                  className="w-full justify-start"
                  variant="outline"
                >
                  {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : <List className="mr-2 h-4 w-4" />}
                  Generate Backlog
                </Button>
                <Button
                  onClick={() => generateArtifact('proposal')}
                  disabled={isLoading}
                  className="w-full justify-start"
                  variant="outline"
                >
                  {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : <FileText className="mr-2 h-4 w-4" />}
                  Generate Proposal
                </Button>
                <Button
                  onClick={() => generateArtifact('contentPlan')}
                  disabled={isLoading}
                  className="w-full justify-start"
                  variant="outline"
                >
                  {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : <Calendar className="mr-2 h-4 w-4" />}
                  Generate Content Plan
                </Button>
              </CardContent>
            </Card>

            {/* Recent Artifacts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Artifacts</CardTitle>
              </CardHeader>
              <CardContent>
                {artifacts.length ? (
                  <div className="space-y-2">
                    {artifacts.slice(-5).map((artifact) => (
                      <div
                        key={artifact.id}
                        className="p-2 border rounded cursor-pointer hover:bg-muted"
                        onClick={() => setSelectedArtifact(artifact)}
                      >
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{artifact.type}</Badge>
                          <span className="text-xs text-muted-foreground">#{artifact.id}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No artifacts generated yet</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Artifact Preview */}
        {selectedArtifact && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Artifact Preview: {selectedArtifact.type}</span>
                <Badge>{selectedArtifact.id}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="preview">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="json">JSON</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <div className="bg-muted p-4 rounded-lg">
                    {selectedArtifact.type === 'backlog' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold">Generated Backlog</h3>
                        <div>
                          <h4 className="font-medium mb-2">Epics:</h4>
                          {selectedArtifact.data.epics?.map((epic: any) => (
                            <div key={epic.id} className="mb-2">
                              <Badge variant="outline" className="mr-2">{epic.id}</Badge>
                              {epic.title}
                            </div>
                          ))}
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Stories:</h4>
                          {selectedArtifact.data.stories?.map((story: any) => (
                            <div key={story.id} className="mb-1 text-sm">
                              <Badge variant="secondary" className="mr-2">{story.id}</Badge>
                              {story.title}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedArtifact.type === 'proposal' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold">{selectedArtifact.data.title}</h3>
                        <p>{selectedArtifact.data.summary}</p>
                        <div>
                          <h4 className="font-medium mb-2">Scope:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {selectedArtifact.data.scope?.map((item: string, index: number) => (
                              <li key={index} className="text-sm">{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span><strong>Timeline:</strong> {selectedArtifact.data.timeline}</span>
                          <span><strong>Investment:</strong> {selectedArtifact.data.investment}</span>
                        </div>
                      </div>
                    )}
                    {selectedArtifact.type === 'contentPlan' && (
                      <div className="space-y-4">
                        <h3 className="font-semibold">{selectedArtifact.data.theme}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedArtifact.data.posts?.map((post: any) => (
                            <div key={post.id} className="border p-3 rounded">
                              <h4 className="font-medium">{post.title}</h4>
                              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                                <span>{post.type}</span>
                                <span>{post.date}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="json" className="mt-4">
                  <Textarea
                    readOnly
                    value={JSON.stringify(selectedArtifact.data, null, 2)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}