import { setLoading } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getPostsApi, updateRoleApi, paymentApi } from '@domain/api';
import { setAllPosts, paymentSuccess } from './actions';
import { GET_ALL_POSTS, PAYMENT_REQUEST, UPDATE_ROLE } from './constants';
import { setToken, setUser } from '@containers/Client/actions';

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

function* handleUpdateRole() {
  try {
    const updateRoleResult = yield call(updateRoleApi);
    yield put(setToken(updateRoleResult.token))
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
    yield put(paymentSuccess(response.token));
    window.snap.pay(response.token, {
      onSuccess() {
        toast.success('Successful!');
        cbSuccess && cbSuccess()
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

export default function* homeSaga() {
  yield takeLatest(GET_ALL_POSTS, doGetAllPosts);
  yield takeLatest(PAYMENT_REQUEST, handlePayment);
  yield takeLatest(UPDATE_ROLE, handleUpdateRole);
}
