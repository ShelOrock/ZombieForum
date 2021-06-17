import Sequelize from 'sequelize';
const { TEXT, INTEGER, BOOLEAN, VIRTUAL } = Sequelize;

import db from '../database.js';

const Conversation = db.define('conversation', {
  title: {
    type: TEXT,
    allowNull: true,
  },

  hasAnswer: {
    type: BOOLEAN,
    defaultValue: false,
  },

  repo: {
    type: TEXT,
    allowNull: true,
  },

  views: {
    type: INTEGER,
    defaultValue: 0,
  },
  seen: {
    type: BOOLEAN,
    defaultValue: false,
  },

  replyCount: {
    type: VIRTUAL,
    get() {
      return this.getReplies().length;
    },
  },
});

export default Conversation;
