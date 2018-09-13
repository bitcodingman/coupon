import axios from 'axios';

//
//
//
//
// ==================== store 회원 API 호출 ====================

// 로그인 요청
export const login = (email, password) =>
  axios.post('/api/account/signin', { email, password });

// 로그아웃 요청
export const logout = () => axios.post('/api/account/logout');

// 로그인상태확인 요청
export const checkLogin = () => axios.get('/api/account/session');

// 스토어정보 가져오기
export const getStampList = storeId =>
  axios.post('/api/store/stampList', { storeId });

// 아이템 이미지 요청
export const getItemImg = () => axios.get('/api/store/itemimg');

// 스탬프 저장하기
export const setStamp = stampInfo =>
  axios.post('/api/store/setStamp', { stampInfo });

// 스탬프 수정하기
export const updateStamp = stampInfo =>
  axios.post('/api/store/updateStamp', { stampInfo });

// 회원 적립내역 가져오기
export const getSaveHistory = storeId =>
  axios.post('/api/store/saveHistory', { storeId });

//
//
//
//
// ==================== consumer 회원 API 호출 ====================

// 적립중인 스탬프 리스트 가져오기
export const getSavingStampList = userId =>
  axios.post('/api/consumer/savingStampList', { userId });

// 사용가능한 쿠폰 리스트 가져오기
export const getCouponList = userId =>
  axios.post('/api/consumer/couponList', { userId });
