import { PAYMENT_REQUEST, PAYMENT_SUCCESS } from "./constants";

export const paymentRequest = (payload) => ({
  type: PAYMENT_REQUEST,
  payload
});

export const paymentSuccess = (payload) => ({
  type: PAYMENT_SUCCESS,
  payload,
});