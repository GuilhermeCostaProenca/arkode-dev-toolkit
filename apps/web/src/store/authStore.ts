import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../lib/apiClient';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  setAuth: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setAuth: (token: string, user: User) => {
        localStorage.setItem('arkode_token', token);
        set({ 
          token, 
          user, 
          isAuthenticated: true 
        });
      },

      logout: () => {
        localStorage.removeItem('arkode_token');
        set({ 
          token: null, 
          user: null, 
          isAuthenticated: false 
        });
      },
    }),
    {
      name: 'arkode-auth',
      partialize: (state) => ({ 
        user: state.user, 
        token: state.token,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);