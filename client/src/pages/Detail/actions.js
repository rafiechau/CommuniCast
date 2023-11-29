import {
  ADDCOMMENT_REQUEST,
  EDITCOMMENT_REQUEST,
  DELETE_COMMENT_REQUEST,
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS
} from './constants';

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