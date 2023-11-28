import { produce } from 'immer';

import {
  IS_VERIFY,
  RESET_REGISTER_STEP,
  SET_EMAIL,
  SET_EXPIRE_TIME,
  SET_STEP,
  SET_TOKEN_VERIFY,
} from '@pages/Register/constants';

export const initialState = {
  step: 0,
  email: null,
  tokenVerify: null,
  expire: null,
  isVerify: false,
};

export const storedKey = ['step', 'email', 'tokenVerify', 'expire'];

const registerReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_STEP:
        draft.step = action.step;
        break;
      case SET_EMAIL:
        draft.email = action.email;
        break;
      case IS_VERIFY:
        draft.isVerify = action.isVerify;
        break;
      case SET_EXPIRE_TIME:
        draft.expire = action.expire;
        break;
      case SET_TOKEN_VERIFY:
        draft.tokenVerify = action.token;
        break;
      case RESET_REGISTER_STEP:
        return initialState;
    }
  });

export default registerReducer;
