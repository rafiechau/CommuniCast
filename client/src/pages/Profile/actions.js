import { GET_PROFILE, RESET_PROFILE, SET_PROFILE } from './constants';

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
