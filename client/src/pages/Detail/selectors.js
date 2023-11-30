import { createSelector } from 'reselect';
import { initialState } from './reducer';

const fetchDetailState = (state) => state.detail || initialState;

export const selectPost = createSelector(fetchDetailState, (state) => state.post);

export const selectComment = createSelector(fetchDetailState, (state) => state.comment);
