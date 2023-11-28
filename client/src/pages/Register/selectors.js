import { createSelector } from 'reselect';

import { initialState as clientInitialState } from '@containers/Client/reducer';
import { initialState as registerInitialState } from '@pages/Register/reducer';

const selectClientState = (state) => state.client || clientInitialState;
export const selectLogin = createSelector(selectClientState, (state) => state.login);

const selectRegisterState = (state) => state.register || registerInitialState;
export const selectStep = createSelector(selectRegisterState, (state) => state.step);
export const selectEmail = createSelector(selectRegisterState, (state) => state.email);
export const selectTokenEmail = createSelector(selectRegisterState, (state) => state.tokenVerify);
export const selectIsVerify = createSelector(selectRegisterState, (state) => state.isVerify);
export const selectExpire = createSelector(selectRegisterState, (state) => state.expire);
