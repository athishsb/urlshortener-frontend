//backend URL
export const BASE_URL = "https://urlshortener-backend-wcgz.onrender.com";

import axios from "axios";

//1
export const addUser = async (payload) => {
  const response = await axios.post(`${BASE_URL}/user/signup`, payload);
  return response;
};

//2
export const activateAccount = async (id, token, payload) => {
  const response = await axios.post(
    `${BASE_URL}/user/activate/${id}/${token}`,
    payload
  );
  return response;
};

//3
export const activationMail = async (payload) => {
  const response = await axios.post(`${BASE_URL}/user/activation`, payload);
  return response;
};

//4
export const forgotPassword = async (payload) => {
  const response = await axios.post(
    `${BASE_URL}/user/forgot-password`,
    payload
  );
  return response;
};

//5
export const verifyAuthorization = async (id, token) => {
  const response = await axios.get(
    `${BASE_URL}/user/forgot-password/authorize/${id}/${token}`
  );
  return response;
};

//6
export const resetPassword = async (id, payload) => {
  const response = await axios.post(
    `${BASE_URL}/user/reset-password/${id}`,
    payload
  );
  return response;
};

//7
export const userLogin = async (payload) => {
  const response = await axios.post(`${BASE_URL}/user/login`, payload);
  return response;
};

//8
export const createURL = async (data, config) => {
  const response = await axios.post(`${BASE_URL}/url/createURL`, data, config);
  return response;
};

//9
export const getAllURL = async (data, config) => {
  const response = await axios.post(`${BASE_URL}/url/all`, data, config);
  return response;
};

//10
export const getTodayURL = async (data, config) => {
  const response = await axios.post(`${BASE_URL}/url/today`, data, config);
  return response;
};

//11
export const getMonthlyURL = async (data, config) => {
  const response = await axios.post(`${BASE_URL}/url/monthly`, data, config);
  return response;
};

//12
export const updateURLCount = async (data, config) => {
  const response = await axios.post(`${BASE_URL}/url/clickcount`, data, config);
  return response;
};
