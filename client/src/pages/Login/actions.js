import { LOGIN, LOGOUT } from './constants';

export const actionHandleLogin = (data, callback) => ({
  type: LOGIN,
  data,
  callback,
});
export const actionHandleLogout = (callback) => ({
  type: LOGOUT,
  callback,
});
