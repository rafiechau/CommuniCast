import {
  GET_ALL_POSTS,
  SET_ALL_POSTS,
  PAYMENT_REQUEST,
  PAYMENT_SUCCESS,
  UPDATE_ROLE
} from '@pages/Home/constants';

export const getAllPosts = () => ({
  type: GET_ALL_POSTS,
});

export const updateRole = () => ({
  type: UPDATE_ROLE,
});

export const setAllPosts = (allPosts) => ({
  type: SET_ALL_POSTS,
  allPosts,
});

export const paymentRequest = (cbSuccess) => ({
  type: PAYMENT_REQUEST,
  cbSuccess,
});

export const paymentSuccess = (payload) => ({
  type: PAYMENT_SUCCESS,
  payload,
});
