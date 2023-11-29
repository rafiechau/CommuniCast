import { takeLatest, call, put } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { addCommentApi, editCommentApi, deleteCommentApi, fetchCommentApi } from '@domain/api';
import { ADDCOMMENT_REQUEST, EDITCOMMENT_REQUEST, DELETE_COMMENT_REQUEST, FETCH_COMMENT_REQUEST } from './constants';
import { fetchCommentSuccess } from './actions';

function* handleAddForm(action) {
  try {
    const { formData, postId } = action.payload;
    yield call(addCommentApi, { formData, postId });
    console.log(formData, postId, "saga");
    toast.success('succes add comment')
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.error);
    // yield put(registerFailure(error.response.data.message));
    // yield put(registerFailure(error.response.data.error));
  }
}

function* handleEditForm(action) {
  try {
    const { formData, idComment } = action.payload;
    yield call(editCommentApi, { formData, idComment });
    toast.success('Edit successful!');
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
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

function* fetchDetailCommentSaga({ id }) {
  try {
    const data = yield call(fetchCommentApi, id);
    yield put(fetchCommentSuccess(data));
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export default function* detailSaga() {
  yield takeLatest(ADDCOMMENT_REQUEST, handleAddForm);
  yield takeLatest(EDITCOMMENT_REQUEST, handleEditForm);
  yield takeLatest(DELETE_COMMENT_REQUEST, handleDeleteComment);
  yield takeLatest(FETCH_COMMENT_REQUEST, fetchDetailCommentSaga)
}
