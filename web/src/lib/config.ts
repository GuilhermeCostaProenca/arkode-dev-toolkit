// Environment configuration for ARKODE OS
export const config = {
  API_URL: import.meta.env.VITE_WEB_API_URL || 'http://localhost:8000',
  MOCK_API: (localStorage.getItem('MOCK_API') || import.meta.env.VITE_MOCK_API || 'true') === 'true',
  APP_NAME: 'ARKODE OS',
} as const;

export const setMockMode = (enabled: boolean) => {
  localStorage.setItem('MOCK_API', enabled.toString());
  window.location.reload();
};