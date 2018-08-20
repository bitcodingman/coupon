import axios from 'axios';

// 로그인 요청
export const login = (email, password) =>
  axios.post('/api/account/signin', { email, password });

// 로그아웃 요청
export const logout = () => axios.post('/api/account/logout');

// 로그인상태확인 요청
export const checkLogin = () => axios.get('/api/account/getsession');

// 스토어정보 가져오기
export const getStoreInfo = userId =>
  axios.post('/api/store/getinfo', { userId });
