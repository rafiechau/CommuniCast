import { setLoading } from '@containers/App/actions';
import { getMyPostsApi } from '@domain/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { setMyPost } from './actions';
import { GET_MY_POSTS } from './constants';

export function* doGetMyPosts(action) {
  yield put(setLoading(true));
  try {
    const { token } = action.payload;
    const response = yield call(getMyPostsApi, token);
    yield put(setMyPost(response));
  } catch (error) {
    toast.error('Error fetching my posts');
  } finally {
    yield put(setLoading(false));
  }
}

export default function* myPostSaga() {
  yield takeLatest(GET_MY_POSTS, doGetMyPosts);
}
