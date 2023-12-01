import { all } from 'redux-saga/effects';

import loginSaga from '@pages/Login/saga';
import appSaga from '@containers/App/saga';
import homeSaga from '@pages/Home/saga';
import addCommentSaga from '@pages/Detail/saga';
import registerSaga from '@pages/Register/saga';
import forgotPasswordSaga from '@pages/ForgotPassword/saga';
import resetPasswordSaga from '@pages/ResetPassword/saga';
import profileSaga from '@pages/Profile/saga';
import EditProfileSaga from '@pages/EditProfile/saga';
import MessageSaga from '@pages/Message/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    loginSaga(),
    registerSaga(),
    forgotPasswordSaga(),
    resetPasswordSaga(),
    addCommentSaga(),
    homeSaga(),
    profileSaga(),
    EditProfileSaga(),
    MessageSaga(),
  ]);
}
