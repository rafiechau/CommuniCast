import {
  CHECK_USER_VOTE,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  GET_ALL_POSTS,
  LIKE_POST,
  RESET_DELETE_SUCCESS,
  SET_ALL_POSTS,
  SET_USER_VOTE,
  UNLIKE_POST,
  UPDATE_POST,
} from '@pages/Home/constants';
import { PAYMENT_REQUEST, PAYMENT_SUCCESS } from './constants';

export const getAllPosts = (token) => ({
  type: GET_ALL_POSTS,
  payload: { token }
});

export const setAllPosts = (allPosts) => ({
  type: SET_ALL_POSTS,
  allPosts,
});

export const paymentRequest = (payload) => ({
  type: PAYMENT_REQUEST,
  payload,
});

export const paymentSuccess = (payload) => ({
  type: PAYMENT_SUCCESS,
  payload,
});

export const likePost = (postId, token) => ({
  type: LIKE_POST,
  payload: { postId, token, voteValue: { voteValue: 1 } },
});

export const unLikePost = (postId, token) => ({
  type: UNLIKE_POST,
  payload: { postId, token },
});

export const updatePost = (updatedPost) => ({
  type: UPDATE_POST,
  payload: updatedPost,
});

export const checkUserVote = (postId, token) => ({
  type: CHECK_USER_VOTE,
  payload: { postId, token },
});

export const setUserVote = (postId, hasVoted) => ({
  type: SET_USER_VOTE,
  payload: { postId, hasVoted },
});

export const deletePostById = (postId, token) => ({
  type: DELETE_POST,
  payload: { postId, token },
});

export const deletePostSuccess = (postId) => ({
  type: DELETE_POST_SUCCESS,
  payload: postId,
});

export const resetDeleteSuccess = () => ({
  type: RESET_DELETE_SUCCESS,
});
