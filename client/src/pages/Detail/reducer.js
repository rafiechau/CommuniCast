import { produce } from 'immer';
import { SET_POST_BY_ID } from './constants';

export const initialState = {
  post: {},
};

export const storedKey = [];

const postDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_POST_BY_ID:
        draft.post = action.post;
        break;
    }
  });

export default postDetailReducer;
