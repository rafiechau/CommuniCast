import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import { takeLatest, call, put } from 'redux-saga/effects';

import { apiHandleResetForgotPassword } from '@domain/api';

import { showPopup, setLoading } from '@containers/App/actions';
import { SEND_RESET_PASSWORD } from '@pages/ResetPassword/constants';

function* sendResetPassword({ data, callback }) {
  yield put(setLoading(true));
  try {
    data.new_password = CryptoJS.AES.encrypt(data.new_password, import.meta.env.VITE_CRYPTOJS_SECRET).toString();
    const response = yield call(apiHandleResetForgotPassword, data);
    toast.success(response.message);
    yield call(callback);
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* resetPasswordSaga() {
  yield takeLatest(SEND_RESET_PASSWORD, sendResetPassword);
}
