import config from '@config/index';
import { merge } from 'lodash';
import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  posts: 'posts',
  user: 'user',
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

export const getPostsApi = (token) => callAPI(`${urls.posts}/`, 'GET', { Authorization: `Bearer ${token}` });
// export const getPaginatedPostsApi = (page, limit) => callAPI(`${urls.posts}?page=${page}&limit=${limit}`, 'GET');
export const getPostByIdApi = (postId) => callAPI(`${urls.posts}/${postId}`, 'GET');
export const likePostApi = (postId, data, token) =>
  callAPI(`${urls.posts}/like/${postId}`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);

export const unlikePostApi = (postId, token) =>
  callAPI(`${urls.posts}/unlike/${postId}`, 'DELETE', { Authorization: `Bearer ${token}` });

export const checkUserVoteApi = (postId, token) =>
  callAPI(`${urls.posts}/check-vote/${postId}`, 'GET', { Authorization: `Bearer ${token}` });

export const deletePostByIdApi = (postId, token) =>
  callAPI(`${urls.posts}/delete/${postId}`, 'DELETE', { Authorization: `Bearer ${token}` });

export const createPostApi = (data, token) =>
  callAPI(`${urls.posts}/create`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);

export const getMyPostsApi = (token) => callAPI(`${urls.posts}/my-post`, 'GET', { Authorization: `Bearer ${token}` });

export const updatePostByIdApi = (postId, data, token) =>
  callAPI(`${urls.posts}/update/${postId}`, 'PUT', { Authorization: `Bearer ${token}` }, {}, data);

export const addCommentApi = (data) => callAPI(urls.addComment, 'POST', {}, {}, data);
export const editCommentApi = ({ formDataObj, idComment }) =>
  callAPI(`${urls.editComment}/${idComment}`, 'PUT', {}, {}, formDataObj);
export const deleteCommentApi = (id) => callAPI(`${urls.delete}/${id}`, 'DELETE');
export const paymentApi = () => callAPI(urls.payment, 'POST');

// user
export const apiHandleLogin = (data) => callAPI(`${urls.user}/login`, 'POST', {}, {}, data);
export const apiHandleRegister = (data) => callAPI(`${urls.user}/register`, 'POST', {}, {}, data);
export const apiHandleSendVerifyEmail = (data) => callAPI(`${urls.user}/verifyEmail`, 'POST', {}, {}, data);
export const apiHandleCheckOtpVerifyEmail = (data) => callAPI(`${urls.user}/checkOtpVerifyEmail`, 'POST', {}, {}, data);
export const apiHandleSendForgotPassword = (data) => callAPI(`${urls.user}/sendForgotPassword`, 'POST', {}, {}, data);
export const apiHandleResetForgotPassword = (data) => callAPI(`${urls.user}/resetPassword`, 'PUT', {}, {}, data);
export const apiHandleGetProfile = () => callAPI(`${urls.user}/profile`, 'GET');
export const apiHandleEditPhotoProfile = (data) =>
  callAPI(`${urls.user}/edit/photoProfile`, 'PUT', { 'Content-Type': 'multipart/form-data' }, {}, data);
export const apiHandleEditProfile = (data) => callAPI(`${urls.user}/edit/profile`, 'PUT', {}, {}, data);
export const apiHandleDeleteUser = () => callAPI(`${urls.user}/delete/profile`, 'DELETE');
