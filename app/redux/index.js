import { combineReducers } from 'redux';
import { users, user } from './users/reducers.js';
import { conversation, allConversations } from './conversations/reducers.js';
import { repositories } from './repository/reducers.js';
import statusMessage from './statusMessage/reducers.js';
import { tags } from './tags/reducers.js';
import replies from './replies/reducers.js';
import body from './body/reducers.js';

const appReducer = combineReducers({
  users,
  user,
  conversation,
  replies,
  allConversations,
  repositories,
  statusMessage,
  tags,
  body,
});

export default appReducer;
