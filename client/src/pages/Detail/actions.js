import {
  ADDCOMMENT_REQUEST,
} from './constants';

export const addCommentRequest = (payload) => ({
  type: ADDCOMMENT_REQUEST,
  payload,
});
