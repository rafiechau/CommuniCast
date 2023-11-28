import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { addCommentApi, editCommentApi, deleteCommentApi } from '@domain/api';
import { ADDCOMMENT_REQUEST, EDITCOMMENT_REQUEST, DELETE_COMMENT_REQUEST } from './constants';

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

function* handleEditForm(action) {
  try {
    const { formDataObj, id_comment } = action.payload;
    yield call(editCommentApi, { formDataObj, id_comment });
    toast.success('Edit successful!');
  } catch (error) {
    console.log(error);
    // if (error.response.data.error) {
    //   toast.error(error.response.data.error);
    // } else {
    //   toast.error(error.response.data.message);
    // }
    // yield put(registerFailure(error.response.data.message));
    // yield put(registerFailure(error.response.data.error));
  }
}

function* handleDeleteComment(action) {
  try {
    yield call(deleteCommentApi, action.payload);
    toast.success('Delete successful!');
    // yield put(fetchDataRequest());
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
}



export default function* addCommentSaga() {
  yield takeLatest(ADDCOMMENT_REQUEST, handleAddForm);
  yield takeLatest(EDITCOMMENT_REQUEST, handleEditForm);
  yield takeLatest(DELETE_COMMENT_REQUEST, handleDeleteComment)
}