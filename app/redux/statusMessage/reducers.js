import { SET_STATUS_MESSAGE } from './constants.js';

const initialState = {
  status: null,
  message: ''
}

export const statusMessage = (state = initialState, action) => {
  switch (action.type) {
    case SET_STATUS_MESSAGE:
      return action.statusMessage;

    default:
      return state;
  }
};
