import type { 
  HealthResponse, 
  AuthResponse, 
  Workspace, 
  Project, 
  ProjectDetails 
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
};