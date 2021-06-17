import Sequelize from 'sequelize';
const { TEXT, INTEGER, BOOLEAN, VIRTUAL } = Sequelize;
import moment from 'moment';

import db from '../database.js';

const Reply = db.define('reply', {
  body: {
    type: TEXT,
    allowNull: false,
  },

  postNumber: {
    type: INTEGER,
    defaultValue: 0,
  },

  isFlagged: {
    type: BOOLEAN,
    defaultValue: false,
  },

  javascriptCode: {
    type: TEXT,
    defaultValue: '',
  },

  cssCode: {
    type: TEXT,
    defaultValue: '',
  },

  htmlCode: {
    type: TEXT,
    defaultValue: '',
  },

  timeSincePosted: {
    type: VIRTUAL,
    get() {
      // TODO: HAVE THIS RETURN AS A TIME SINCE  NOW()
      return moment(this.createdAt).fromNow();
    },
  },

  timeSinceUpdated: {
    type: VIRTUAL,
    get() {
      //TODO: HAVE THIS RETURN AS A TIME SINCE NOW()
      return moment(this.updatedAt).fromNow();
    },
  },
});

export default Reply;
