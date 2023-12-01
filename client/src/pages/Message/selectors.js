import { createSelector } from 'reselect';
import { initialState } from '@pages/Message/reducer';

const selectUserState = (state) => state.message || initialState;

export const selectProfile = createSelector(selectUserState, (state) => state.profile);
export const selectTokenStream = createSelector(selectUserState, (state) => state.token);
export const selectUsersAvailable = createSelector(selectUserState, (state) => state.users);
