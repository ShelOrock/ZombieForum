import Sequelize from 'sequelize';
const { STRING } = Sequelize;

import db from '../database.js';

const Activity = db.define('activity', {
  category: {
    type: STRING,
    values: ['like', 'reply', 'post'],
  },
});
 
export default Activity;