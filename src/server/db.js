import mysql from 'mysql2';

import config from './config';

const pool = mysql.createPool({
  ...config.db,
  namedPlaceholders: true,
});

const connectionWrapper = {
  query: (...args) => {
    let sqlArgs = [];

    const callback = args[args.length - 1]; //last arg is callback

    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
        return callback(err);
      }
      if (args.length > 2) {
        sqlArgs = args[1];
      }
      connection.query(args[0], sqlArgs, (err, results) => {
        connection.release(); // always put connection back in pool after last query
        if (err) {
          console.log(err);
          return callback(err);
        }
        callback(null, results);
      });
    });
  },
};

export default connectionWrapper;
