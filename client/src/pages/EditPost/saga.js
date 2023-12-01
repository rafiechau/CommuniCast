import { setLoading } from '@containers/App/actions';
import { getMyPostsApi, updatePostByIdApi } from '@domain/api';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getMyPost } from '@pages/MyPost/actions';
import { UPDATE_POST_BY_ID } from './constants';

function* doUpdatePost(action) {
  yield put(setLoading(true));
  try {
    const { postId, data, token } = action.payload;
    const response = yield call(updatePostByIdApi, postId, data, token);
    yield put(getMyPost(getMyPostsApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* editPostSaga() {
  yield takeLatest(UPDATE_POST_BY_ID, doUpdatePost);
}
