import { SET_ALL_REPLIES } from './constants.js';

const initialState = []

export const replies = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_REPLIES:
      return action.replies;

    default:
      return state;
  };
};
