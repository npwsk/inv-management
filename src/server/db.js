import mysql from 'mysql2';

import config from './config';

const db = mysql.createConnection({
  ...config.db,
  namedPlaceholders: true,
});

db.connect((error) => {
  if (error) {
    throw error;
  }

  console.log('Successfully connected to the database.');
});

export default db;
