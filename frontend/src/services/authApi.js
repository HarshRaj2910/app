import api from './apiClient';

export async function loginApi(email, password) {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
}

export async function signupApi(payload) {
  const res = await api.post('/auth/register', payload);
  return res.data;
}

export async function getMe() {
  const res = await api.get('/auth/me');
  return res.data.user;
}

