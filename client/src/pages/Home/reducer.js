import { produce } from 'immer';
import { DELETE_POST_SUCCESS, RESET_DELETE_SUCCESS, SET_ALL_POSTS, SET_USER_VOTE, UPDATE_POST } from './constants';

export const initialState = {
  posts: [],
  allPosts: [],
  userVotes: {},
  deleteSuccess: false,
};

export const storedKey = [];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_POSTS:
        draft.allPosts = action.allPosts;
        action.allPosts.data.forEach((post) => {
          draft.userVotes[post.id] = post.hasVoted;
        });
        break;
      case UPDATE_POST:
        {
          const index = draft.posts.findIndex((post) => post.id === action.payload.id);
          if (index !== -1) {
            draft.posts[index] = action.payload;
          }
        }
        break;
      case DELETE_POST_SUCCESS:
        draft.deleteSuccess = true;
        break;
      case RESET_DELETE_SUCCESS:
        draft.deleteSuccess = false;
        break;
      case SET_USER_VOTE:
        // Menyimpan status vote pengguna ke state
        draft.userVotes[action.payload.postId] = action.payload.hasVoted;
        break;
    }
  });

export default homeReducer;
