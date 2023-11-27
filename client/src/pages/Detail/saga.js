import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { addCommentApi } from '@domain/api';
import { ADDCOMMENT_REQUEST } from './constants';

function* handleAddForm(action) {
  try {
    yield call(addCommentApi, action.payload);
    toast.success('succes add comment') // kenapa gk kena
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.error);
    // yield put(registerFailure(error.response.data.message));
    // yield put(registerFailure(error.response.data.error));
  }
}

export default function* addCommentSaga() {
  yield takeLatest(ADDCOMMENT_REQUEST, handleAddForm);
}
