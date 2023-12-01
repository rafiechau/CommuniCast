import { DELETE_USER, EDIT_PROFILE, GET_PROFILE, RESET_PROFILE, SET_PROFILE } from './constants';

export const actionGetProfile = () => ({
  type: GET_PROFILE,
});

export const actionSetProfile = (profile) => ({
  type: SET_PROFILE,
  profile,
});
export const actionResetProfile = () => ({
  type: RESET_PROFILE,
});
export const actionDeleteSer = (callback) => ({
  type: DELETE_USER,
  callback,
});
export const actionEditProfile = (data, callback) => ({
  type: EDIT_PROFILE,
  data,
  callback,
});
