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
  update: (id, data) => api.put(`/services/${id}`, data),
  updateStatus: (id, status) => api.put(`/services/${id}/status`, { status }),
  delete: (id) => api.delete(`/services/${id}`),
};

export const serviceItemsService = {
  getByService: (serviceId) => api.get(`/service-items/service/${serviceId}`),
  create: (data) => api.post('/service-items', data),
  update: (id, data) => api.put(`/service-items/${id}`, data),
  delete: (id) => api.delete(`/service-items/${id}`),
};

export const financeService = {
  getAll: () => api.get('/finance'),
  getSummary: () => api.get('/finance/summary'),
  create: (data) => api.post('/finance', data),
  update: (id, data) => api.put(`/finance/${id}`, data),
  delete: (id) => api.delete(`/finance/${id}`),
};

export const inventoryService = {
  getAll: () => api.get('/inventory'),
  create: (data) => api.post('/inventory', data),
  update: (id, data) => api.put(`/inventory/${id}`, data),
  updateStock: (id, stock) => api.put(`/inventory/${id}/stock`, { stock }),
  delete: (id) => api.delete(`/inventory/${id}`),
};

export const reportsService = {
  getDashboard: () => api.get('/reports/dashboard'),
  getSalesByPeriod: (period = 'month') => api.get(`/reports/sales-by-period?period=${period}`),
  getTopProducts: (limit = 10) => api.get(`/reports/top-products?limit=${limit}`),
  getServiceStatus: () => api.get('/reports/service-status'),
  getRevenueByCategory: () => api.get('/reports/revenue-by-category'),
  getInventoryTurnover: () => api.get('/reports/inventory-turnover'),
};

export const salesService = {
  getAll: () => api.get('/sales'),
  createSale: (data) => api.post('/sales', data),
  getSummary: () => api.get('/sales/summary'),
};

export default api;
