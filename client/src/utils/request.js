import axios from 'axios';
import store from '@store';

import { actionHandleLogout } from '@pages/Login/actions';

axios.interceptors.request.use((reqConfig) => {
  const state = store.getState();
  const { token } = state.client;
  if (token) {
    reqConfig.headers.Authorization = `Bearer ${token}`;
  }
  return reqConfig;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { dispatch } = store;
    if (error.response?.status === 401) {
      dispatch(actionHandleLogout(() => window.location.href('/login')));
    }
    return Promise.reject(error);
  }
);

const request = (options) => axios(options);

export default request;
