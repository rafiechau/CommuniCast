import { setLoading } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getPostsApi } from '@domain/api';
import { setAllPosts, paymentSuccess } from './actions';
import { GET_ALL_POSTS, PAYMENT_REQUEST } from './constants';
import { paymentApi } from '../../domain/api';

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

export default function* homeSaga() {
  yield takeLatest(GET_ALL_POSTS, doGetAllPosts);
  yield takeLatest(PAYMENT_REQUEST, handlePayment);
}
