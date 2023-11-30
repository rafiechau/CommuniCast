import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyPostState = (state) => state.myPost || initialState;

export const selectAllMyPosts = createSelector(selectMyPostState, (state) => state);
