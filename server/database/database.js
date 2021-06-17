import Sequelize from 'sequelize';

const DATABASE_NAME = 'zombieforum';

const db = process.env.DATABASE_URL
  ? new Sequelize(
    process.env.DATABASE_URL,
    {
      logging: false,
      dialect: 'postgres',
      dialectOptions: {
        ssl: { rejectUnauthorized: false }
      }
    }
  )
  : new Sequelize(
    `postgres://localhost:5432/${ DATABASE_NAME }`,
    {
      logging: false
    }
  );

export default db;
