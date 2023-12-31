import {
  IS_VERIFY,
  REGISTER,
  RESET_REGISTER_STEP,
  SEND_OTP,
  SEND_VERIFY_EMAIL,
  SET_EMAIL,
  SET_EXPIRE_TIME,
  SET_STEP,
  SET_TOKEN_VERIFY,
} from './constants';

export const actionHandleRegister = (data, callback) => ({
  type: REGISTER,
  data,
  callback,
});
export const actionSetStep = (step) => ({
  type: SET_STEP,
  step,
});
export const actionSetEmail = (email) => ({
  type: SET_EMAIL,
  email,
});
export const actionSetExpire = (expire) => ({
  type: SET_EXPIRE_TIME,
  expire,
});
export const actionSetVerify = (isVerify) => ({
  type: IS_VERIFY,
  isVerify,
});
export const actionSetTokenVerify = (token) => ({
  type: SET_TOKEN_VERIFY,
  token,
});
export const actionHandleSendEmailVerify = (data) => ({
  type: SEND_VERIFY_EMAIL,
  data,
});
export const actionHandleSendOTP = (data) => ({
  type: SEND_OTP,
  data,
});
export const actionHandleResetRegister = () => ({
  type: RESET_REGISTER_STEP,
});
