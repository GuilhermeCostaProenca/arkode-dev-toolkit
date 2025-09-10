import type { 
  HealthResponse, 
  AuthResponse, 
  Workspace, 
  Project, 
  ProjectDetails,
  Lead,
  Client,
  Proposal,
  CalendarItem,
  Artifact,
  Article,
  Repo
} from './apiClient';

// Mock data
const mockUser = {
  id: '1',
  name: 'John Developer',
  email: 'john@arkode.dev'
};

const mockWorkspaces: Workspace[] = [
  { id: '1', name: 'ARKODE Studio', slug: 'arkode-studio' },
  { id: '2', name: 'Client Projects', slug: 'client-projects' },
  { id: '3', name: 'Internal Tools', slug: 'internal-tools' },
];

const mockProjects: Project[] = [
  { 
    id: '1', 
    name: 'ARKODE Web App', 
    status: 'active', 
    client: 'Internal',
    workspace_id: '1' 
  },
  { 
    id: '2', 
    name: 'Dashboard UI', 
    status: 'active', 
    workspace_id: '1' 
  },
  { 
    id: '3', 
    name: 'Client Portal', 
    status: 'on-hold', 
    client: 'Acme Corp',
    workspace_id: '2' 
  },
  { 
    id: '4', 
    name: 'Analytics Tool', 
    status: 'archived', 
    workspace_id: '3' 
  },
];

// Agency Mock Data
const mockLeads: Lead[] = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@startup.com', status: 'new', next_step: 'Schedule discovery call' },
  { id: '2', name: 'Tech Corp', email: 'contact@techcorp.com', status: 'contacted', next_step: 'Send proposal' },
  { id: '3', name: 'Digital Agency', email: 'hello@digitalagency.com', status: 'interested', next_step: 'Contract negotiation' },
];

const mockClients: Client[] = [
  { id: '1', name: 'Acme Corporation', segment: 'Enterprise' },
  { id: '2', name: 'StartupXYZ', segment: 'Startup' },
  { id: '3', name: 'Local Business', segment: 'SMB' },
];

const mockProposals: Proposal[] = [
  { id: '1', title: 'E-commerce Platform Development', status: 'sent' },
  { id: '2', title: 'Brand Identity Package', status: 'approved' },
  { id: '3', title: 'Web App MVP', status: 'draft' },
];

const mockCalendar: CalendarItem[] = [
  { id: '1', title: 'Product Launch Announcement', date: '2024-01-15', status: 'scheduled' },
  { id: '2', title: 'Behind the Scenes Content', date: '2024-01-17', status: 'draft' },
  { id: '3', title: 'Customer Success Story', date: '2024-01-20', status: 'published' },
];

const mockArticles: Article[] = [
  { id: '1', title: 'Getting Started with React', tags: ['react', 'tutorial'], updatedAt: '2024-01-10' },
  { id: '2', title: 'TypeScript Best Practices', tags: ['typescript', 'development'], updatedAt: '2024-01-08' },
  { id: '3', title: 'Design System Guidelines', tags: ['design', 'ui'], updatedAt: '2024-01-05' },
];

const mockRepos: Repo[] = [
  { id: '1', name: 'arkode-web', full_name: 'arkode/arkode-web' },
  { id: '2', name: 'client-portal', full_name: 'arkode/client-portal' },
  { id: '3', name: 'design-system', full_name: 'arkode/design-system' },
];

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API implementation
export const mockApi = {
  health: async (): Promise<HealthResponse> => {
    await delay(200);
    return { ok: true };
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    await delay(800);
    
    // Simple validation for demo
    if (email === 'john@arkode.dev' && password === 'password') {
      return {
        token: 'mock_jwt_token_' + Date.now(),
        user: mockUser
      };
    }
    
    throw new Error('Invalid credentials');
  },

  getWorkspaces: async (): Promise<Workspace[]> => {
    await delay();
    return [...mockWorkspaces];
  },

  createWorkspace: async (name: string): Promise<Workspace> => {
    await delay();
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-')
    };
    mockWorkspaces.push(newWorkspace);
    return newWorkspace;
  },

  getProjects: async (workspace_id: string): Promise<Project[]> => {
    await delay();
    return mockProjects.filter(p => p.workspace_id === workspace_id);
  },

  createProject: async (workspace_id: string, name: string): Promise<Project> => {
    await delay();
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      status: 'active',
      workspace_id
    };
    mockProjects.push(newProject);
    return newProject;
  },

  getProject: async (id: string): Promise<ProjectDetails> => {
    await delay();
    const project = mockProjects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    
    return {
      ...project,
      stats: {
        stories: Math.floor(Math.random() * 50) + 10,
        tasks: Math.floor(Math.random() * 100) + 20,
      }
    };
  },

  // Agency endpoints
  getLeads: async (): Promise<Lead[]> => {
    await delay();
    return [...mockLeads];
  },

  createLead: async (lead: Omit<Lead, 'id'>): Promise<Lead> => {
    await delay();
    const newLead: Lead = {
      id: Date.now().toString(),
      ...lead
    };
    mockLeads.push(newLead);
    return newLead;
  },

  getClients: async (): Promise<Client[]> => {
    await delay();
    return [...mockClients];
  },

  createClient: async (client: Omit<Client, 'id'>): Promise<Client> => {
    await delay();
    const newClient: Client = {
      id: Date.now().toString(),
      ...client
    };
    mockClients.push(newClient);
    return newClient;
  },

  getProposals: async (): Promise<Proposal[]> => {
    await delay();
    return [...mockProposals];
  },

  createProposal: async (proposal: Omit<Proposal, 'id'>): Promise<Proposal> => {
    await delay();
    const newProposal: Proposal = {
      id: Date.now().toString(),
      ...proposal
    };
    mockProposals.push(newProposal);
    return newProposal;
  },

  getProposal: async (id: string): Promise<Proposal> => {
    await delay();
    const proposal = mockProposals.find(p => p.id === id);
    if (!proposal) throw new Error('Proposal not found');
    return {
      ...proposal,
      markdown: proposal.markdown || `# ${proposal.title}\n\n## Executive Summary\n\nThis is a sample proposal for ${proposal.title}.\n\n## Scope of Work\n\n- Phase 1: Discovery and Planning\n- Phase 2: Design and Development\n- Phase 3: Testing and Launch\n\n## Timeline\n\n8-12 weeks\n\n## Investment\n\n$XX,XXX`
    };
  },

  getCalendar: async (): Promise<CalendarItem[]> => {
    await delay();
    return [...mockCalendar];
  },

  createCalendarItem: async (item: Omit<CalendarItem, 'id'>): Promise<CalendarItem> => {
    await delay();
    const newItem: CalendarItem = {
      id: Date.now().toString(),
      ...item
    };
    mockCalendar.push(newItem);
    return newItem;
  },

  // ORION endpoints
  generateArtifact: async (type: string, prompt?: string, context?: any): Promise<Artifact> => {
    await delay(1500); // Longer delay to simulate AI generation
    
    const artifacts: Record<string, any> = {
      backlog: {
        epics: [
          { id: 'E1', title: 'User Authentication System', stories: ['S1', 'S2', 'S3'] },
          { id: 'E2', title: 'Dashboard UI', stories: ['S4', 'S5'] }
        ],
        stories: [
          { id: 'S1', title: 'User Registration', tasks: ['T1', 'T2'], epic: 'E1' },
          { id: 'S2', title: 'Login Flow', tasks: ['T3', 'T4'], epic: 'E1' },
          { id: 'S3', title: 'Password Reset', tasks: ['T5'], epic: 'E1' },
          { id: 'S4', title: 'Main Dashboard', tasks: ['T6', 'T7'], epic: 'E2' },
          { id: 'S5', title: 'User Profile Page', tasks: ['T8'], epic: 'E2' }
        ],
        tasks: [
          { id: 'T1', title: 'Create registration form UI', story: 'S1' },
          { id: 'T2', title: 'Implement validation logic', story: 'S1' },
          { id: 'T3', title: 'Design login interface', story: 'S2' },
          { id: 'T4', title: 'Connect to authentication API', story: 'S2' },
          { id: 'T5', title: 'Build password reset flow', story: 'S3' },
          { id: 'T6', title: 'Create dashboard layout', story: 'S4' },
          { id: 'T7', title: 'Add data visualization components', story: 'S4' },
          { id: 'T8', title: 'Build profile edit form', story: 'S5' }
        ]
      },
      proposal: {
        title: 'Custom Web Application Development',
        summary: 'A comprehensive solution for modern business needs.',
        scope: ['Discovery & Planning', 'UI/UX Design', 'Development', 'Testing & QA', 'Deployment'],
        timeline: '12-16 weeks',
        investment: '$45,000 - $65,000'
      },
      contentPlan: {
        theme: 'Product Launch Campaign',
        posts: [
          { id: 1, title: 'Behind the Scenes: Development Journey', type: 'Story', date: '2024-01-15' },
          { id: 2, title: 'Meet the Team: Our Core Values', type: 'Team Spotlight', date: '2024-01-17' },
          { id: 3, title: 'Product Demo: Key Features Walkthrough', type: 'Demo', date: '2024-01-20' },
          { id: 4, title: 'Customer Success: Real User Impact', type: 'Case Study', date: '2024-01-22' }
        ]
      }
    };

    return {
      id: Date.now().toString(),
      type: type as any,
      data: artifacts[type] || { message: `Generated ${type} artifact` }
    };
  },

  // Knowledge endpoints
  getArticles: async (): Promise<Article[]> => {
    await delay();
    return [...mockArticles];
  },

  createArticle: async (article: Omit<Article, 'id' | 'updatedAt'>): Promise<Article> => {
    await delay();
    const newArticle: Article = {
      id: Date.now().toString(),
      ...article,
      updatedAt: new Date().toISOString()
    };
    mockArticles.push(newArticle);
    return newArticle;
  },

  getArticle: async (id: string): Promise<Article> => {
    await delay();
    const article = mockArticles.find(a => a.id === id);
    if (!article) throw new Error('Article not found');
    return {
      ...article,
      markdown: article.markdown || `# ${article.title}\n\nThis is a sample article about ${article.title}.\n\n## Introduction\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\n\n## Main Content\n\nDetailed information goes here.\n\n## Conclusion\n\nSummary and key takeaways.`
    };
  },

  // Integration endpoints
  connectGitHub: async (): Promise<{ ok: boolean }> => {
    await delay();
    return { ok: true };
  },

  getGitHubRepos: async (): Promise<Repo[]> => {
    await delay();
    return [...mockRepos];
  },
};