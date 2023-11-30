import { produce } from 'immer';
import { SET_MY_POSTS } from './constants';

export const initialState = {
  userPosts: [],
  userVotes: {},
};

export const storedKey = [];

const myPostReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_MY_POSTS:
        draft.userPosts = action.payload.data;
        action.payload.data.forEach((post) => {
          draft.userVotes[post.id] = post.hasVoted;
        });
        break;
    }
  });

export default myPostReducer;
