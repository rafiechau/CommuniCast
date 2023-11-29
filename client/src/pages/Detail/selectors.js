import { createSelector } from 'reselect';
import { initialState } from './reducer';

const fetchDetailState = (state) => state.detail || initialState;

export const selectComment = createSelector(fetchDetailState, (state) => state.comment);
