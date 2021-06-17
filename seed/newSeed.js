import chalk from 'chalk';

import seed from './data/seed.js';
import { db } from '../server/database/index.js';

db.sync({ force: true })
  .then(() => seed())
  .then(() => {
    console.log(chalk.blue('new seed created successfully'));
    process.exit(0);
  })
  .catch(e => {
    console.log(chalk.red('problem creating a new seed', e));
    process.exit(1);
  })
