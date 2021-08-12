import { SET_ALL_REPOS } from './constants.js';

const initialState = [];

export const repositories = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_REPOS:
      return action.repos;

    default:
      return state;
  }
};
