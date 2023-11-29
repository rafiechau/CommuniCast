import { createSelector } from 'reselect';
import { initialState } from '@pages/EditProfile/reducer';

const selectUserState = (state) => state.profile || initialState;

export const selectProfile = createSelector(selectUserState, (state) => state.profile);
