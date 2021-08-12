import { SET_ALL_REPLIES } from './constants.js';

export const setAllReplies = replies => ({
  type: SET_ALL_REPLIES,
  replies,
});
