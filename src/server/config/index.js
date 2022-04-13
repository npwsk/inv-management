import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  },
  port: process.env.PORT,
  env: process.env.NODE_ENV,
};

export default config;
