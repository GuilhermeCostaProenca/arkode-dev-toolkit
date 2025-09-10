import axios from 'axios';
import { config } from './config';

// Types for API responses
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Workspace {
  id: string;
  name: string;
  slug: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'archived' | 'on-hold';
  client?: string;
  workspace_id: string;
}

export interface ProjectDetails extends Project {
  stats: {
    stories: number;
    tasks: number;
  };
}

export interface HealthResponse {
  ok: boolean;
}

// Agency Types
export interface Lead {
  id: string;
  name: string;
  email: string;
  status: 'new' | 'contacted' | 'interested' | 'closed';
  next_step: string;
}

export interface Client {
  id: string;
  name: string;
  segment: string;
}

export interface Proposal {
  id: string;
  title: string;
  status: 'draft' | 'sent' | 'approved' | 'rejected';
  markdown?: string;
}

export interface CalendarItem {
  id: string;
  title: string;
  date: string;
  status: 'draft' | 'scheduled' | 'published';
}

// ORION Types
export interface Artifact {
  id: string;
  type: 'backlog' | 'proposal' | 'contentPlan';
  data: any;
}

export interface OrionSession {
  id: string;
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>;
  artifacts: Artifact[];
  createdAt: string;
}

// Knowledge Types
export interface Article {
  id: string;
  title: string;
  tags: string[];
  updatedAt: string;
  markdown?: string;
}

// Integration Types
export interface Repo {
  id: string;
  name: string;
  full_name: string;
}

// API Client
const apiClient = axios.create({
  baseURL: config.API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('arkode_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
export const api = {
  // Health check
  health: (): Promise<HealthResponse> => 
    apiClient.get('/health').then(res => res.data),

  // Auth
  login: (email: string, password: string): Promise<AuthResponse> =>
    apiClient.post('/auth/login', { email, password }).then(res => res.data),

  // Workspaces
  getWorkspaces: (): Promise<Workspace[]> =>
    apiClient.get('/workspaces').then(res => res.data),

  createWorkspace: (name: string): Promise<Workspace> =>
    apiClient.post('/workspaces', { name }).then(res => res.data),

  // Projects
  getProjects: (workspace_id: string): Promise<Project[]> =>
    apiClient.get('/projects', { params: { workspace_id } }).then(res => res.data),

  createProject: (workspace_id: string, name: string): Promise<Project> =>
    apiClient.post('/projects', { workspace_id, name }).then(res => res.data),

  getProject: (id: string): Promise<ProjectDetails> =>
    apiClient.get(`/projects/${id}`).then(res => res.data),

  // Agency
  getLeads: (): Promise<Lead[]> =>
    apiClient.get('/agency/leads').then(res => res.data),

  createLead: (lead: Omit<Lead, 'id'>): Promise<Lead> =>
    apiClient.post('/agency/leads', lead).then(res => res.data),

  getClients: (): Promise<Client[]> =>
    apiClient.get('/agency/clients').then(res => res.data),

  createClient: (client: Omit<Client, 'id'>): Promise<Client> =>
    apiClient.post('/agency/clients', client).then(res => res.data),

  getProposals: (): Promise<Proposal[]> =>
    apiClient.get('/agency/proposals').then(res => res.data),

  createProposal: (proposal: Omit<Proposal, 'id'>): Promise<Proposal> =>
    apiClient.post('/agency/proposals', proposal).then(res => res.data),

  getProposal: (id: string): Promise<Proposal> =>
    apiClient.get(`/agency/proposals/${id}`).then(res => res.data),

  getCalendar: (): Promise<CalendarItem[]> =>
    apiClient.get('/agency/calendar').then(res => res.data),

  createCalendarItem: (item: Omit<CalendarItem, 'id'>): Promise<CalendarItem> =>
    apiClient.post('/agency/calendar', item).then(res => res.data),

  // ORION
  generateArtifact: (type: string, prompt?: string, context?: any): Promise<Artifact> =>
    apiClient.post('/orion/generate', { type, prompt, context }).then(res => res.data),

  // Knowledge
  getArticles: (): Promise<Article[]> =>
    apiClient.get('/kb/articles').then(res => res.data),

  createArticle: (article: Omit<Article, 'id' | 'updatedAt'>): Promise<Article> =>
    apiClient.post('/kb/articles', article).then(res => res.data),

  getArticle: (id: string): Promise<Article> =>
    apiClient.get(`/kb/articles/${id}`).then(res => res.data),

  // Integrations
  connectGitHub: (): Promise<{ ok: boolean }> =>
    apiClient.post('/integrations/github/connect').then(res => res.data),

  getGitHubRepos: (): Promise<Repo[]> =>
    apiClient.get('/integrations/github/repos').then(res => res.data),
};