import {
  ADDCOMMENT_REQUEST,
  EDITCOMMENT_REQUEST,
  DELETE_COMMENT_REQUEST,
  GET_POST_BY_ID,
  SET_POST_BY_ID,
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
} from '@pages/Detail/constants';

export const getPostById = (postId) => ({
  type: GET_POST_BY_ID,
  postId,
});

export const setPostById = (post, postId) => ({
  type: SET_POST_BY_ID,
  post,
  postId,
});

export const addCommentRequest = (payload) => ({
  type: ADDCOMMENT_REQUEST,
  payload,
});

export const editCommentRequest = (payload) => ({
  type: EDITCOMMENT_REQUEST,
  payload,
});

export const deleteCommentRequest = (id) => ({
  type: DELETE_COMMENT_REQUEST,
  payload: id,
});

export const fetchCommentRequest = (id) => ({
  type: FETCH_COMMENT_REQUEST,
  id,
});

export const fetchCommentSuccess = (payload) => ({
  type: FETCH_COMMENT_SUCCESS,
  payload,
});
