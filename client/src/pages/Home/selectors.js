import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomeState = (state) => state.home || initialState;

export const selectAllPosts = createSelector(selectHomeState, (state) => state.allPosts);
export const selectPosts = createSelector(selectHomeState, (state) => state.posts);
