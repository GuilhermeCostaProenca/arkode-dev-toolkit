import { create } from 'zustand';
import type { Article } from '../lib/apiClient';

interface KbState {
  articles: Article[];
  searchQuery: string;
  selectedTags: string[];
  
  setArticles: (articles: Article[]) => void;
  addArticle: (article: Article) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  getFilteredArticles: () => Article[];
}

export const useKbStore = create<KbState>((set, get) => ({
  articles: [],
  searchQuery: '',
  selectedTags: [],

  setArticles: (articles: Article[]) => {
    set({ articles });
  },

  addArticle: (article: Article) => {
    set(state => ({ 
      articles: [...state.articles, article] 
    }));
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSelectedTags: (tags: string[]) => {
    set({ selectedTags: tags });
  },

  getFilteredArticles: () => {
    const { articles, searchQuery, selectedTags } = get();
    
    return articles.filter(article => {
      const matchesSearch = !searchQuery || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => article.tags.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  },
}));