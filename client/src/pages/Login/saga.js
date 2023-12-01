import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { takeLatest, call, put } from 'redux-saga/effects';

import { apiHandleLogin, apiHandleLogout } from '@domain/api';

import { showPopup, setLoading } from '@containers/App/actions';
import { setLogin, setToken, setUser } from '@containers/Client/actions';
import { LOGIN, LOGOUT } from '@pages/Login/constants';

function* sagaHandleLogin({ data, callback }) {
  yield put(setLoading(true));
  try {
    data.password = CryptoJS.AES.encrypt(data.password, import.meta.env.VITE_CRYPTOJS_SECRET).toString();
    const response = yield call(apiHandleLogin, data);
    yield call(callback);
    yield put(setLogin(true));
    yield put(setToken(response.token));
    const { role, id, fullName } = jwtDecode(response.token);
    yield put(setUser({ role, id, fullName }));
    toast.success(response.message);
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sagaHandleLogout({ callback }) {
  yield put(setLoading(true));
  try {
    const response = yield call(apiHandleLogout);
    toast.success(response.message);
    yield call(callback);
    yield put(setLogin(false));
    yield put(setToken(null));
    yield put(setUser(null));
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* loginSaga() {
  yield takeLatest(LOGIN, sagaHandleLogin);
  yield takeLatest(LOGOUT, sagaHandleLogout);
}
