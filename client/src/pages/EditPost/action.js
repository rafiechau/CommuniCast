import { UPDATE_POST_BY_ID } from './constants';

export const updatePostById = (postId, data, token) => ({
  type: UPDATE_POST_BY_ID,
  payload: { postId, data, token },
});
