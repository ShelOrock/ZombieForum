import { SET_CURRENT_CONVERSATION, SET_ALL_CONVERSATIONS } from './constants.js';

export const setCurrentConversation = conversation => ({
  type: SET_CURRENT_CONVERSATION,
  conversation
})

export const setAllConversations = allConversations => ({
  type: SET_ALL_CONVERSATIONS,
  allConversations
})
