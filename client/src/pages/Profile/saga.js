import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'react-hot-toast';

import { apiHandleEditPhotoProfile, apiHandleGetProfile } from '@domain/api';

import { showPopup, setLoading } from '@containers/App/actions';
import { actionSetProfile } from '@pages/Profile/actions';
import { EDIT_PHOTO_PROFILE, GET_PROFILE } from '@pages/Profile/constants';

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
function* sagaHandleEditPhotoProfile({ data }) {
  yield put(setLoading(true));
  try {
    const response = yield call(apiHandleEditPhotoProfile, { image: data });
    yield put(actionSetProfile(response.data));
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

export default function* profileSaga() {
  yield takeLatest(GET_PROFILE, sagaHandleGetUser);
  yield takeLatest(EDIT_PHOTO_PROFILE, sagaHandleEditPhotoProfile);
}
