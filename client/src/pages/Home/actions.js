import { GET_ALL_POSTS, SET_ALL_POSTS } from '@pages/Home/constants';
import { PAYMENT_REQUEST, PAYMENT_SUCCESS } from './constants';

export const getAllPosts = () => ({
  type: GET_ALL_POSTS,
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
