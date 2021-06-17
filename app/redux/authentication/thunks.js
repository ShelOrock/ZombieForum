import axios from 'axios';

import { setUser } from '../users/actions.js';
import { checkError } from '../statusMessage/utils.js';

export const attemptLogin = credentials => {
  return dispatch => {
    axios
      .post('/auth/login', credentials)
      .then(res => dispatch(setUser(res.data)))
      .catch(e => {
        dispatch(setUser({}));
        checkError(dispatch, e.response.status);
      });
  };
};

export const attemptLogout = id => {
  return dispatch => {
    axios
      .put('/auth/logout', { id })
      .then(() => dispatch(setUser({})))
      .catch(e => {
        dispatch(setUser({}));
        checkError(dispatch, e.response.status);
      });
  };
};
