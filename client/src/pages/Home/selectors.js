import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomeState = (state) => state.home || initialState;

export const selectAllPosts = createSelector(selectHomeState, (state) => state.allPosts.data);
export const selectPosts = createSelector(selectHomeState, (state) => state.posts);
export const selectUserVotes = createSelector(selectHomeState, (stet) => stet.userVotes);

export const selectDeleteSuccess = createSelector(selectHomeState, (state) => state.deleteSuccess);
