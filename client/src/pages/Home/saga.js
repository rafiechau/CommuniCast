import { setLoading } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getPostsApi } from '@domain/api';
import { setAllPosts } from './actions';
import { GET_ALL_POSTS } from './constants';

export function* doGetAllPosts() {
  yield put(setLoading(true));
  try {
    const response = yield call(getPostsApi);
    yield put(setAllPosts(response));
  } catch (error) {
    toast.error('Error fetching posts');
  } finally {
    yield put(setLoading(false));
  }
}

export default function* homeSaga() {
  yield takeLatest(GET_ALL_POSTS, doGetAllPosts);
}
