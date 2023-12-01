import { CREATE_POST } from './constants';

export const createPost = (data, token) => ({
  type: CREATE_POST,
  payload: { data, token },
});
