import { DRAFT_BODY } from './constants.js';

const initialState = {};

export const body = (state = initialState, action) => {
  switch (action.type) {
    case DRAFT_BODY:
      return action.body
  
    default:
      return state;
  }
};
  