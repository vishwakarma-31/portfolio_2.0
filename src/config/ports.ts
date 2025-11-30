/// <reference types="node" />
// Centralized port configuration
export const PORTS = {
  // eslint-disable-next-line no-undef
  FRONTEND: typeof process !== 'undefined' && process.env && process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  // eslint-disable-next-line no-undef
  BACKEND: typeof process !== 'undefined' && process.env && process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT, 10) : 3001,
};

export const getFrontendPort = (): number => {
  return PORTS.FRONTEND;
};

export const getBackendPort = (): number => {
  return PORTS.BACKEND;
};

export const getApiUrl = (): string => {
  // eslint-disable-next-line no-undef
  return (typeof process !== 'undefined' && process.env && process.env.VITE_API_URL) || `http://localhost:${getBackendPort()}`;
};