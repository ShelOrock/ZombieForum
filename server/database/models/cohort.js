import Sequelize from 'sequelize';
const { STRING } = Sequelize;

import db from '../database.js';

const Cohort = db.define('cohorts', {
  name: {
    type: STRING,
    allowNull: false,
  },
});

export default Cohort;
