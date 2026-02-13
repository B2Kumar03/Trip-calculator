import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject({ message, status: error.response?.status });
  }
);

// User APIs
export const userAPI = {
  create: (data) => api.post('/users', data),
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  getByEmail: (email) => api.get(`/users/email/${email}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Trip APIs
export const tripAPI = {
  create: (data) => api.post('/trips', data),
  getAll: () => api.get('/trips'),
  getById: (id) => api.get(`/trips/${id}`),
  update: (id, data) => api.put(`/trips/${id}`, data),
  delete: (id) => api.delete(`/trips/${id}`),
  addMember: (tripId, userId) => api.post(`/trips/${tripId}/members`, { user_id: userId }),
  removeMember: (tripId, userId) => api.delete(`/trips/${tripId}/members`, { data: { user_id: userId } }),
};

// Expense APIs
export const expenseAPI = {
  create: (data) => api.post('/expenses', data),
  getAll: () => api.get('/expenses'),
  getById: (id) => api.get(`/expenses/${id}`),
  getByTrip: (tripId) => api.get(`/expenses/trip/${tripId}`),
  getSummary: (tripId) => api.get(`/expenses/trip/${tripId}/summary`),
  update: (id, data) => api.put(`/expenses/${id}`, data),
  delete: (id) => api.delete(`/expenses/${id}`),
};

// Settlement APIs
export const settlementAPI = {
  calculate: (tripId) => api.post(`/settlements/trip/${tripId}/calculate`),
  getByTrip: (tripId) => api.get(`/settlements/trip/${tripId}`),
  updateStatus: (tripId, settlementIndex, status) => 
    api.put(`/settlements/trip/${tripId}/status`, { settlementIndex, status }),
  getAll: () => api.get('/settlements'),
};

// Chat APIs
export const chatAPI = {
  getOrCreate: (tripId) => api.get(`/chat/trip/${tripId}`),
  getMessages: (tripId) => api.get(`/chat/trip/${tripId}/messages`),
  addMessage: (data) => api.post('/chat/message', data),
  deleteMessage: (tripId, messageId) => api.delete(`/chat/trip/${tripId}/message/${messageId}`),
};

export default api;
