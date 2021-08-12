import { SET_ALL_REPOS } from './constants.js';

export const setAllRepos = repos => ({
  type: SET_ALL_REPOS,
  repos,
});
