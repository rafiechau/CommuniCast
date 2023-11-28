import { GET_ALL_POSTS, SET_ALL_POSTS } from '@pages/Home/constants';

export const getAllPosts = () => ({
  type: GET_ALL_POSTS,
});

export const setAllPosts = (allPosts) => ({
  type: SET_ALL_POSTS,
  allPosts,
});
