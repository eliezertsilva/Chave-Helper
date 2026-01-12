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
  getById: (id) => api.get(`/clients/${id}`),
  create: (data) => api.post('/clients', data),
  update: (id, data) => api.put(`/clients/${id}`, data),
  delete: (id) => api.delete(`/clients/${id}`),
};

export const servicesService = {
  getAll: () => api.get('/services'),
  create: (data) => api.post('/services', data),
  updateStatus: (id, status) => api.put(`/services/${id}/status`, { status }),
};

export const financeService = {
  getAll: () => api.get('/finance'),
  getSummary: () => api.get('/finance/summary'),
  create: (data) => api.post('/finance', data),
};

export const inventoryService = {
  getAll: () => api.get('/inventory'),
  create: (data) => api.post('/inventory', data),
  updateStock: (id, stock) => api.put(`/inventory/${id}/stock`, { stock }),
};

export default api;
