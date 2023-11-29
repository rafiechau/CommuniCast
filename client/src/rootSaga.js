import { all } from 'redux-saga/effects';

import loginSaga from '@pages/Login/saga';
import appSaga from '@containers/App/saga';
import homeSaga from '@pages/Home/saga';
import detailSaga from '@pages/Detail/saga';
import registerSaga from '@pages/Register/saga';
import forgotPasswordSaga from '@pages/ForgotPassword/saga';
import resetPasswordSaga from '@pages/ResetPassword/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    loginSaga(),
    registerSaga(),
    forgotPasswordSaga(),
    resetPasswordSaga(),
    detailSaga(),
    homeSaga(),
  ]);
}
