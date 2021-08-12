import {
  SET_TAGS,
  SET_WHITELIST,
  SET_ACTIVE
} from './constants.js';

export const setTags = tags => ({
  type: SET_TAGS,
  tags,
});

export const setWhitelist = () => ({
  type: SET_WHITELIST,
});

export const setActive = () => ({
  type: SET_ACTIVE,
});