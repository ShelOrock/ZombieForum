import axios from 'axios';

import { setTags, setWhitelist, setActive } from './actions.js';
import { checkError } from '../statusMessage/utils.js';

export const fetchTags = () => {
  return dispatch => {
    return axios
      .get('/api/tag')
      .then(response => {
        dispatch(setTags(response.data));
        dispatch(setWhitelist());
        dispatch(setActive());
      })
      .catch(e => checkError(dispatch, e.response.status));
  };
};
