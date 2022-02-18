import http from './http';

const data = (response) => response.data;

export const clientsApi = {
  list: () => http.get('/api/clients').then(data),
  get: (id) => http.get(`/api/clients/${id}`).then(data),
  create: (client) => http.post('/api/clients', client).then(data),
  update: (id, client) => http.put(`/api/clients/${id}`, client).then(data),
  remove: (id) => http.delete(`/api/clients/${id}`),
};
