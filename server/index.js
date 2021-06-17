import chalk from 'chalk';

import app from './express.js';
import db from './database/database.js';

const PORT = process.env.PORT || 3000;

db.sync()
  .then(() => console.log(chalk.greenBright('db synced')))
  .then(() => {
    app.listen(PORT, () => {
      console.log(chalk.blueBright(`App is listening on localhost:${ PORT }`))
    });
  })
  .catch(e => {
    console.error(chalk.red('Error syncing database', e));
    process.exit(1);
  });
