import config from '@config/index';
import { merge } from 'lodash';
import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  posts: 'posts',
  user: 'user',
  comment: 'users/comment',
  midtras: 'users/midtras',
  payment: 'users/payment',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

export const getPostsApi = () => callAPI(`${urls.posts}/`, 'GET');

// comment and payment
export const fetchCommentApi = (id) => callAPI(`${urls.comment}/${id}`, 'GET')
export const addCommentApi = ({ formData, postId }) => callAPI(`${urls.comment}/${postId}`, 'POST', {}, {}, formData);
export const editCommentApi = ({ formData, idComment }) => callAPI(`${urls.comment}/${idComment}`, 'PUT', {}, {}, formData);
export const deleteCommentApi = (idComment) => callAPI(`${urls.comment}/${idComment}`, 'DELETE');
export const paymentApi = () => callAPI(urls.midtras, 'POST');
export const updateRoleApi = () => callAPI(urls.payment, 'PUT');

// user
export const apiHandleLogin = (data) => callAPI(`${urls.user}/login`, 'POST', {}, {}, data);
export const apiHandleRegister = (data) => callAPI(`${urls.user}/register`, 'POST', {}, {}, data);
export const apiHandleSendVerifyEmail = (data) => callAPI(`${urls.user}/verifyEmail`, 'POST', {}, {}, data);
export const apiHandleCheckOtpVerifyEmail = (data) => callAPI(`${urls.user}/checkOtpVerifyEmail`, 'POST', {}, {}, data);
export const apiHandleSendForgotPassword = (data) => callAPI(`${urls.user}/sendForgotPassword`, 'POST', {}, {}, data);
export const apiHandleResetForgotPassword = (data) => callAPI(`${urls.user}/resetPassword`, 'PUT', {}, {}, data);
