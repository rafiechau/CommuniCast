import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import { takeLatest, call, put } from 'redux-saga/effects';

import { apiHandleCheckOtpVerifyEmail, apiHandleRegister, apiHandleSendVerifyEmail } from '@domain/api';

import { REGISTER, SEND_OTP, SEND_VERIFY_EMAIL } from '@pages/Register/constants';
import {
  actionSetEmail,
  actionSetExpire,
  actionSetStep,
  actionSetTokenVerify,
  actionSetVerify,
} from '@pages/Register/actions';
import { showPopup, setLoading } from '@containers/App/actions';

function* sagaHandleSendVerifyEmail({ data }) {
  yield put(setLoading(true));
  try {
    const response = yield call(apiHandleSendVerifyEmail, data);
    toast.success(response?.message);
    yield put(actionSetVerify(false));
    yield put(actionSetStep(1));
    yield put(actionSetTokenVerify(response.data.token));
    yield put(actionSetExpire(response.data.expire));
    yield put(actionSetEmail(data.email));
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sagaHandleSendOTP({ data }) {
  yield put(setLoading(true));
  try {
    const response = yield call(apiHandleCheckOtpVerifyEmail, data);
    toast.success(response?.message);
    yield put(actionSetStep(2));
    yield put(actionSetVerify(true));
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sagaHandleRegister({ data, callback }) {
  yield put(setLoading(true));
  try {
    data.password = CryptoJS.AES.encrypt(data.password, import.meta.env.VITE_CRYPTOJS_SECRET).toString();
    const response = yield call(apiHandleRegister, data);
    toast.success(response?.message);
    yield call(callback);
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* registerSaga() {
  yield takeLatest(SEND_VERIFY_EMAIL, sagaHandleSendVerifyEmail);
  yield takeLatest(SEND_OTP, sagaHandleSendOTP);
  yield takeLatest(REGISTER, sagaHandleRegister);
}
