import { GET_MY_POSTS, SET_MY_POSTS } from './constants';

export const getMyPost = (token) => ({
  type: GET_MY_POSTS,
  payload: { token },
});

export const setMyPost = (posts) => ({
  type: SET_MY_POSTS,
  payload: posts,
});
