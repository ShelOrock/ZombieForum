import { SET_ALL_REPOS } from './constants.js';

export const setAllRepos = repos => {
  return {
    type: SET_ALL_REPOS,
    repos,
  };
};
