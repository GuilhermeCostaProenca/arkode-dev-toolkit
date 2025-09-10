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
};