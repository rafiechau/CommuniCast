import {
  ADDCOMMENT_REQUEST,
  EDITCOMMENT_REQUEST,
  DELETE_COMMENT_REQUEST
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