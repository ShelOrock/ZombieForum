import Sequelize from 'sequelize';
const { STRING } = Sequelize;

import db from '../database.js';

const Tag = db.define('tag', {
  name: {
    type: STRING,
    allowNull: false,
  }
});

export default Tag;