import STATUS_MESSAGE from './constants.js';

export default statusMessage => {
  return {
    type: STATUS_MESSAGE,
    statusMessage,
  };
};
