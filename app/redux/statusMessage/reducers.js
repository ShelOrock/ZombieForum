import STATUS_MESSAGE from './constants.js';

export default (state = { status: null, message: '' }, action) => {
  switch (action.type) {
    case STATUS_MESSAGE:
      return action.statusMessage;

    default:
      return state;
  }
};
