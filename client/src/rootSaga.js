import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import addCommentSaga from '@pages/Detail/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    addCommentSaga()
  ]);
}
