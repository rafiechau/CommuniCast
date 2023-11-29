import { setLoading } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { checkUserVoteApi, deletePostByIdApi, getPostsApi, likePostApi, unlikePostApi } from '@domain/api';
import { setAllPosts, paymentSuccess, updatePost, setUserVote, checkUserVote, deletePostSuccess } from './actions';
import { CHECK_USER_VOTE, DELETE_POST, GET_ALL_POSTS, LIKE_POST, PAYMENT_REQUEST, UNLIKE_POST } from './constants';
import { paymentApi } from '../../domain/api';

export function* doGetAllPosts(action) {
  yield put(setLoading(true));
  try {
    const { token } = action.payload;
    const response = yield call(getPostsApi, token);
    yield put(setAllPosts(response));

    yield all(response.data.map((post) => put(checkUserVote(post.id, token))));
  } catch (error) {
    console.log(error)
    toast.error('Error fetching posts');
  } finally {
    yield put(setLoading(false));
  }
}

function* handlePayment() {
  try {
    const response = yield call(paymentApi);
    yield put(paymentSuccess(response.token));
    window.snap.pay(response.token, {
      onSuccess() {
        toast.success('Successful!');
      },
      onPending(response) {
        toast.error('Pending Payment!');
      },
      onError(response) {
        toast.error('Error Payment!');
      },
      onClose() {
        toast.error('you closed the popup without finishing the payment!');
      },
    });
  } catch (error) {
    console.log(error);
    // toast.error(error.response.data.message);
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
    console.log(postId);
    console.log(token);
    const response = yield call(deletePostByIdApi, postId, token);
    yield put(deletePostSuccess(action.payload.postId));
    toast.success(response.message);
  } catch (error) {
    console.log(error);
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
}
