import { all } from 'redux-saga/effects';

import loginSaga from '@pages/Login/saga';
import appSaga from '@containers/App/saga';
import addCommentSaga from '@pages/Detail/saga';
import homeSaga from '@pages/Home/saga';
import registerSaga from '@pages/Register/saga';

export default function* rootSaga() {
  yield all([appSaga(), addCommentSaga(), homeSaga(), loginSaga(), registerSaga()]);
}
