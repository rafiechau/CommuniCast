import { produce } from 'immer';

import { FETCH_COMMENT_SUCCESS } from './constants';

export const initialState = {
  comment: null,
};

export const storedKey = [];

const detailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case FETCH_COMMENT_SUCCESS:
        draft.comment = action.payload;
        break;
    }
  });

export default detailReducer;