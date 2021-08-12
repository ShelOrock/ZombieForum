import { SET_STATUS_MESSAGE } from './constants.js';

export default statusMessage => ({
  type: SET_STATUS_MESSAGE,
  statusMessage,
})
