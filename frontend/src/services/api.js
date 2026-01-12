import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
};

export const clientsService = {
  getAll: () => api.get('/clients'),
};

export const servicesService = {
  getAll: () => api.get('/services'),
};

export const financeService = {
  getSummary: () => api.get('/finance/summary'),
};

export const inventoryService = {
  getAll: () => api.get('/inventory'),
};

export default api;
