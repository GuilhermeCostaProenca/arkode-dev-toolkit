import { create } from 'zustand';
import type { Lead, Client, Proposal, CalendarItem } from '../lib/apiClient';

interface AgencyState {
  leads: Lead[];
  clients: Client[];
  proposals: Proposal[];
  calendar: CalendarItem[];
  
  setLeads: (leads: Lead[]) => void;
  addLead: (lead: Lead) => void;
  setClients: (clients: Client[]) => void;
  addClient: (client: Client) => void;
  setProposals: (proposals: Proposal[]) => void;
  addProposal: (proposal: Proposal) => void;
  setCalendar: (calendar: CalendarItem[]) => void;
  addCalendarItem: (item: CalendarItem) => void;
}

export const useAgencyStore = create<AgencyState>((set) => ({
  leads: [],
  clients: [],
  proposals: [],
  calendar: [],

  setLeads: (leads: Lead[]) => {
    set({ leads });
  },

  addLead: (lead: Lead) => {
    set(state => ({ 
      leads: [...state.leads, lead] 
    }));
  },

  setClients: (clients: Client[]) => {
    set({ clients });
  },

  addClient: (client: Client) => {
    set(state => ({ 
      clients: [...state.clients, client] 
    }));
  },

  setProposals: (proposals: Proposal[]) => {
    set({ proposals });
  },

  addProposal: (proposal: Proposal) => {
    set(state => ({ 
      proposals: [...state.proposals, proposal] 
    }));
  },

  setCalendar: (calendar: CalendarItem[]) => {
    set({ calendar });
  },

  addCalendarItem: (item: CalendarItem) => {
    set(state => ({ 
      calendar: [...state.calendar, item] 
    }));
  },
}));