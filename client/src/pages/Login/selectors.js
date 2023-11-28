import { createSelector } from 'reselect';

import { initialState } from '@containers/Client/reducer';

const selectLoginState = (state) => state.client || initialState;
export const selectLogin = createSelector(selectLoginState, (state) => state.login);
