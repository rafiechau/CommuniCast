import toast from 'react-hot-toast';
import { takeLatest, call, put } from 'redux-saga/effects';

import { apiHandleSendForgotPassword } from '@domain/api';

import { showPopup, setLoading } from '@containers/App/actions';
import { FORGOT_PASSWORD } from '@pages/ForgotPassword/constants';

function* sagaHandleSendEmailForgot({ data, callback }) {
  yield put(setLoading(true));
  try {
    const response = yield call(apiHandleSendForgotPassword, data);
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

export default function* forgotPasswordSaga() {
  yield takeLatest(FORGOT_PASSWORD, sagaHandleSendEmailForgot);
}
