import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPostDetailState = (state) => state.postDetail || initialState;

export const selectPost = createSelector(selectPostDetailState, (state) => state.post);