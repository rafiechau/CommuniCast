import config from '@config/index';
import { merge } from 'lodash';
import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  posts: 'posts',
  user: 'user',
  chat: 'chat',
  addComment: '/users/comment',
  editComment: '/users/comment',
  deleteComment: '/users/comment',
  payment: '/users/midtras',
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
export const addCommentApi = (data) => callAPI(urls.addComment, 'POST', {}, {}, data);
export const editCommentApi = ({ formDataObj, idComment }) =>
  callAPI(`${urls.editComment}/${idComment}`, 'PUT', {}, {}, formDataObj);
export const deleteCommentApi = (id) => callAPI(`${urls.delete}/${id}`, 'DELETE');
export const paymentApi = () => callAPI(urls.payment, 'POST');

// user
export const apiHandleLogin = (data) => callAPI(`${urls.user}/login`, 'POST', {}, {}, data);
export const apiHandleLogout = () => callAPI(`${urls.user}/logout`, 'GET');
export const apiHandleRegister = (data) => callAPI(`${urls.user}/register`, 'POST', {}, {}, data);
export const apiHandleSendVerifyEmail = (data) => callAPI(`${urls.user}/verifyEmail`, 'POST', {}, {}, data);
export const apiHandleCheckOtpVerifyEmail = (data) => callAPI(`${urls.user}/checkOtpVerifyEmail`, 'POST', {}, {}, data);
export const apiHandleSendForgotPassword = (data) => callAPI(`${urls.user}/forgotPassword`, 'POST', {}, {}, data);
export const apiHandleResetForgotPassword = (data) => callAPI(`${urls.user}/resetPassword`, 'PUT', {}, {}, data);
export const apiHandleGetProfile = () => callAPI(`${urls.user}/profile`, 'GET');
export const apiHandleEditPhotoProfile = (data) =>
  callAPI(`${urls.user}/edit/photoProfile`, 'PUT', { 'Content-Type': 'multipart/form-data' }, {}, data);
export const apiHandleEditProfile = (data) => callAPI(`${urls.user}/edit/profile`, 'PUT', {}, {}, data);
export const apiHandleDeleteUser = () => callAPI(`${urls.user}/delete/profile`, 'DELETE');

// message stream.io
export const apiHandleGetTokenStream = () => callAPI(`${urls.chat}/token`, 'POST');
export const apiHandleGetUsersAvailable = () => callAPI(`${urls.chat}/userAvailable`, 'GET');
export const apiHandleAddChannel = (data) => callAPI(`${urls.chat}/createChannel`, 'POST', {}, {}, data);
