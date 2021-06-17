import { SET_ALL_REPLIES } from './constants.js';

export default (state = [], action) => {
  switch (action.type) {
    case SET_ALL_REPLIES:
      return action.replies;

    default:
      return state;
  }
};
