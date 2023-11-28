import config from '@config/index';
import { merge } from 'lodash';
import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  addComment: '/users/comment',
  editComment: '/users/comment',
  deleteComment: '/users/comment',
  payment: '/users/midtras'
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
export const addCommentApi = (data) => callAPI(urls.addComment, 'POST', {}, {}, data)
export const editCommentApi = ({ formDataObj, id_comment }) => callAPI(`${urls.editComment}/${id_comment}`, 'PUT', {}, {}, formDataObj)
export const deleteCommentApi = (id) => callAPI(`${urls.delete}/${id}`, 'DELETE');
// export const paymentApi = (data) => callAPI(urls.payment, 'POST', {}, {}, data);
export const paymentApi = () => callAPI(urls.payment, 'POST');