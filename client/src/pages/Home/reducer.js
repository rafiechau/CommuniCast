import { produce } from 'immer';
import { SET_ALL_POSTS } from './constants';

export const initialState = {
  posts: [],
  allPosts: [],
};

export const storedKey = [];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_POSTS:
        draft.allPosts = action.allPosts;
        break;
    }
  });

export default homeReducer;
