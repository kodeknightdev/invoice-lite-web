import http from './http';

const data = (response) => response.data;

export const authApi = {
  login: (credentials) => http.post('/api/auth/login', credentials).then(data),
  register: (details) => http.post('/api/auth/register', details).then(data),
};

export const clientsApi = {
  list: () => http.get('/api/clients').then(data),
  get: (id) => http.get(`/api/clients/${id}`).then(data),
  create: (client) => http.post('/api/clients', client).then(data),
  update: (id, client) => http.put(`/api/clients/${id}`, client).then(data),
  remove: (id) => http.delete(`/api/clients/${id}`),
};

export const invoicesApi = {
  list: () => http.get('/api/invoices').then(data),
  get: (id) => http.get(`/api/invoices/${id}`).then(data),
  create: (invoice) => http.post('/api/invoices', invoice).then(data),
  update: (id, invoice) => http.put(`/api/invoices/${id}`, invoice).then(data),
  remove: (id) => http.delete(`/api/invoices/${id}`),
  send: (id) => http.post(`/api/invoices/${id}/send`).then(data),
  markPaid: (id) => http.post(`/api/invoices/${id}/mark-paid`).then(data),
  voidInvoice: (id) => http.post(`/api/invoices/${id}/void`).then(data),
};

export const paymentsApi = {
  createIntent: (invoiceId) => http.post(`/api/invoices/${invoiceId}/payment-intent`).then(data),
};

export const dashboardApi = {
  summary: () => http.get('/api/dashboard').then(data),
};
