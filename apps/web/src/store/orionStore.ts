import { create } from 'zustand';
import type { Artifact, OrionSession } from '../lib/apiClient';

interface OrionState {
  currentSession: OrionSession | null;
  artifacts: Artifact[];
  
  setCurrentSession: (session: OrionSession | null) => void;
  addArtifact: (artifact: Artifact) => void;
  setArtifacts: (artifacts: Artifact[]) => void;
  addMessage: (content: string, role: 'user' | 'assistant') => void;
}

export const useOrionStore = create<OrionState>((set, get) => ({
  currentSession: null,
  artifacts: [],

  setCurrentSession: (session: OrionSession | null) => {
    set({ currentSession: session });
  },

  addArtifact: (artifact: Artifact) => {
    set(state => ({ 
      artifacts: [...state.artifacts, artifact] 
    }));
    
    // Also add to current session if exists
    const { currentSession } = get();
    if (currentSession) {
      set({
        currentSession: {
          ...currentSession,
          artifacts: [...currentSession.artifacts, artifact]
        }
      });
    }
  },

  setArtifacts: (artifacts: Artifact[]) => {
    set({ artifacts });
  },

  addMessage: (content: string, role: 'user' | 'assistant') => {
    const { currentSession } = get();
    if (!currentSession) {
      // Create new session
      const newSession: OrionSession = {
        id: Date.now().toString(),
        messages: [{
          role,
          content,
          timestamp: new Date().toISOString()
        }],
        artifacts: [],
        createdAt: new Date().toISOString()
      };
      set({ currentSession: newSession });
    } else {
      set({
        currentSession: {
          ...currentSession,
          messages: [...currentSession.messages, {
            role,
            content,
            timestamp: new Date().toISOString()
          }]
        }
      });
    }
  },
}));