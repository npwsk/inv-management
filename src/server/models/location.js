import db from '../db';

const Location = function (location) {
  this.building = location.building;
  this.room = location.room;
};

Location.getAll = (callback) => {
  db.query('SELECT * FROM DeviceLocation;', (err, res) => {
    if (err) {
      console.log('Error:', err);
      callback(null, err);
      return;
    }

    console.log('Loactions:', res);
    callback(null, res);
  });
};

Location.findById = (id, callback) => {
  db.query('SELECT * FROM DeviceLocation WHERE id = ?;', id, (err, res) => {
    if (err) {
      console.log('Error:', err);
      callback(err, null);
      return;
    }

    if (res.length) {
      console.log('Found location: ', res[0]);
      callback(null, res[0]);
      return;
    }

    result({ kind: 'not_found' }, null);
  });
};

export default Location;
