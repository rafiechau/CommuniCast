import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import addCommentSaga from '@pages/Detail/saga';
import homeSaga from '@pages/Home/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    addCommentSaga(),
    homeSaga()
  ]);
}
