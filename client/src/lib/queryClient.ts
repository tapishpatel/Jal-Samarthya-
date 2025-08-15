import { QueryClient } from "@tanstack/react-query";

// Detect environment - localhost or deployed
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1' ||
   window.location.hostname.includes('replit.dev'));

// Base URL configuration
const getBaseUrl = () => {
  if (typeof window === 'undefined') return '';
  
  if (isLocalhost) {
    // Development - use current origin
    return window.location.origin;
  } else {
    // Production - use current origin (Netlify handles routing)
    return window.location.origin;
  }
};

const BASE_URL = getBaseUrl();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = Array.isArray(queryKey) ? queryKey.join('') : String(queryKey);
        const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
        
        const response = await fetch(fullUrl, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }
        return response.json();
      },
      retry: (failureCount, error) => {
        // Retry logic for network issues
        if (failureCount < 3 && error.message.includes('fetch')) {
          return true;
        }
        return false;
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

export { queryClient };

export const apiRequest = async (url: string, options?: RequestInit) => {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  
  const response = await fetch(fullUrl, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  return response.json();
};