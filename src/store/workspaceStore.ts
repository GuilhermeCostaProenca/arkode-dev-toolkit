import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Workspace } from '../lib/apiClient';

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspace: Workspace | null;
  
  setWorkspaces: (workspaces: Workspace[]) => void;
  setActiveWorkspace: (workspace: Workspace) => void;
  addWorkspace: (workspace: Workspace) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      workspaces: [],
      activeWorkspace: null,

      setWorkspaces: (workspaces: Workspace[]) => {
        const current = get();
        set({ workspaces });
        
        // Set first workspace as active if none selected
        if (!current.activeWorkspace && workspaces.length > 0) {
          set({ activeWorkspace: workspaces[0] });
        }
      },

      setActiveWorkspace: (workspace: Workspace) => {
        set({ activeWorkspace: workspace });
      },

      addWorkspace: (workspace: Workspace) => {
        set(state => ({ 
          workspaces: [...state.workspaces, workspace] 
        }));
      },
    }),
    {
      name: 'arkode-workspace',
      partialize: (state) => ({ 
        workspaces: state.workspaces,
        activeWorkspace: state.activeWorkspace 
      }),
    }
  )
);