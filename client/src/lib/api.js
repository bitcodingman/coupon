import axios from 'axios';

export const login = (email, password) =>
  axios.post('/api/account/signin', { email, password });

export const logout = () => axios.post('/api/account/logout');

export const checkLogin = () => axios.get('/api/account/getsession');
