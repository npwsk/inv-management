import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
  },
  port: process.env.PORT || 3000,
};

export default config;
