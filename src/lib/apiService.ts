// Main API service that routes between real API and mock
import { config } from './config';
import { api } from './apiClient';
import { mockApi } from './mockApi';

// Use mock or real API based on configuration
export const apiService = config.MOCK_API ? mockApi : api;