import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import { takeLatest, call, put } from 'redux-saga/effects';

import { apiHandleDeleteUser, apiHandleEditProfile, apiHandleGetProfile } from '@domain/api';

import { showPopup, setLoading } from '@containers/App/actions';
import { actionSetProfile } from '@pages/EditProfile/actions';
import { DELETE_USER, EDIT_PROFILE, GET_PROFILE } from '@pages/EditProfile/constants';
import { actionHandleLogout } from '@pages/Login/actions';

function* sagaHandleGetUser() {
  yield put(setLoading(true));
  try {
    const response = yield call(apiHandleGetProfile);
    yield put(actionSetProfile(response.data));
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sagaHandleEditProfile({ data, callback }) {
  yield put(setLoading(true));
  try {
    if (data?.new_password) {
      data.new_password = CryptoJS.AES.encrypt(data.new_password, import.meta.env.VITE_CRYPTOJS_SECRET).toString();
    }
    const response = yield call(apiHandleEditProfile, data);
    toast.success(response.message);
    yield put(actionSetProfile(response.data));
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

function* sagaHandleDeleteUser({ callback }) {
  yield put(setLoading(true));
  try {
    const response = yield call(apiHandleDeleteUser);
    yield put(actionHandleLogout(callback));
    toast.success(response.message);
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* EditProfileSaga() {
  yield takeLatest(GET_PROFILE, sagaHandleGetUser);
  yield takeLatest(EDIT_PROFILE, sagaHandleEditProfile);
  yield takeLatest(DELETE_USER, sagaHandleDeleteUser);
}
