import { create } from 'zustand';
import type { Project, ProjectDetails } from '../lib/apiClient';

interface ProjectState {
  projects: Project[];
  currentProject: ProjectDetails | null;
  
  setProjects: (projects: Project[]) => void;
  setCurrentProject: (project: ProjectDetails | null) => void;
  addProject: (project: Project) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  currentProject: null,

  setProjects: (projects: Project[]) => {
    set({ projects });
  },

  setCurrentProject: (project: ProjectDetails | null) => {
    set({ currentProject: project });
  },

  addProject: (project: Project) => {
    set(state => ({ 
      projects: [...state.projects, project] 
    }));
  },
}));