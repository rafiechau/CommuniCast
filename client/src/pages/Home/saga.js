import { setLoading } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  checkUserVoteApi,
  deletePostByIdApi,
  getMyPostsApi,
  getPostsApi,
  likePostApi,
  unlikePostApi,
  paymentApi,
  updateRoleApi,
} from '@domain/api';
import { getMyPost } from '@pages/MyPost/actions';
import { setToken, setUser } from '@containers/Client/actions';
import { jwtDecode } from 'jwt-decode';
import { setAllPosts, paymentSuccess, updatePost, setUserVote, checkUserVote, deletePostSuccess } from './actions';
import {
  CHECK_USER_VOTE,
  DELETE_POST,
  GET_ALL_POSTS,
  LIKE_POST,
  PAYMENT_REQUEST,
  UNLIKE_POST,
  UPDATE_ROLE,
} from './constants';

export function* doGetAllPosts(action) {
  yield put(setLoading(true));
  try {
    const { token } = action.payload;
    const response = yield call(getPostsApi, token);
    yield put(setAllPosts(response));

    yield all(response.data.map((post) => put(checkUserVote(post.id, token))));
  } catch (error) {
    console.log(error);
    toast.error('Error fetching posts');
  } finally {
    yield put(setLoading(false));
  }
}

function* handleUpdateRole() {
  try {
    const updateRoleResult = yield call(updateRoleApi);
    yield put(setToken(updateRoleResult.token));
    const { role, id, fullName } = jwtDecode(updateRoleResult.token);
    yield put(setUser({ role, id, fullName }));

    if (updateRoleResult) {
      toast.success('User role updated.');
    } else {
      toast.error('Error updating user role!');
    }
  } catch (error) {
    console.log(error);
    toast.error('Error updating user role!');
  }
}

function* handlePayment({ cbSuccess }) {
  try {
    const response = yield call(paymentApi);
    console.log(response)
    yield put(paymentSuccess(response.token));
    window.snap.pay(response.token, {
      onSuccess() {
        toast.success('Successful!');
        cbSuccess && cbSuccess();
      },
      onPending() {
        toast.error('Pending Payment!');
      },
      onError() {
        toast.error('Error Payment!');
      },
      onClose() {
        toast.error('you closed the popup without finishing the payment!');
      },
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
}

function* doVotePost(action) {
  yield put(setLoading(true));
  try {
    const { postId, token, voteValue } = action.payload;
    const response = yield call(likePostApi, postId, voteValue, token);
    yield put(updatePost(response.updatedPost));
  } catch (error) {
    toast.error('Error voting post');
  } finally {
    yield put(setLoading(false));
  }
}

function* doUnVotePost(action) {
  yield put(setLoading(true));
  try {
    const { postId, token } = action.payload;
    const response = yield call(unlikePostApi, postId, token);
    yield put(updatePost(response.updatedPost));
  } catch (error) {
    toast.error('Error unvoting post');
  } finally {
    yield put(setLoading(false));
  }
}

function* checkUserVoteSaga(action) {
  try {
    const { postId, token } = action.payload;
    const response = yield call(checkUserVoteApi, postId, token);
    yield put(setUserVote(action.payload.postId, response.hasVoted));
  } catch (error) {
    toast.error('Error on checking user vote');
  }
}

export function* doDeletePost(action) {
  try {
    const { postId, token } = action.payload;
    const response = yield call(deletePostByIdApi, postId, token);
    yield put(deletePostSuccess(action.payload.postId));
    yield put(getMyPost(getMyPostsApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export default function* homeSaga() {
  yield takeLatest(GET_ALL_POSTS, doGetAllPosts);
  yield takeLatest(PAYMENT_REQUEST, handlePayment);
  yield takeLatest(LIKE_POST, doVotePost);
  yield takeLatest(UNLIKE_POST, doUnVotePost);
  yield takeLatest(CHECK_USER_VOTE, checkUserVoteSaga);
  yield takeLatest(DELETE_POST, doDeletePost);
  yield takeLatest(UPDATE_ROLE, handleUpdateRole);
}
