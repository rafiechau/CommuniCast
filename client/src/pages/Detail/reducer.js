import { produce } from 'immer';
import { SET_POST_BY_ID } from './constants';
import { FETCH_COMMENT_SUCCESS } from './constants';

export const initialState = {
  post: {},
  comment: null,

};

export const storedKey = [];

const detailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_POST_BY_ID:
        draft.post = action.post;
        break;
      case FETCH_COMMENT_SUCCESS:
        draft.comment = action.payload;
    }
  });

export default detailReducer;
