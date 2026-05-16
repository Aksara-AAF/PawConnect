const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  
  const isFormData = options.body instanceof FormData;
  
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Terjadi kesalahan saat menghubungi server');
  }

  return data;
}
