import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import loginSaga from '@pages/Login/saga';
import registerSaga from '@pages/Register/saga';

export default function* rootSaga() {
  yield all([appSaga(), loginSaga(), registerSaga()]);
}
