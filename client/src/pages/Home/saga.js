import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { paymentSuccess } from './actions';
import {  PAYMENT_REQUEST } from './constants';
import { paymentApi } from '../../domain/api';

function* handlePayment() {
  try {
    const response = yield call(paymentApi);
    console.log("ANJING");
    console.log(response, "VVVVVVVVVV");
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
  yield takeLatest(PAYMENT_REQUEST, handlePayment);
}