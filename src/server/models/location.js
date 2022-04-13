import db from '../db';

const Location = function (location) {
  this.building = location.building;
  this.room = location.room;
};

Location.create = (location, callback) => {
  db.query(
    'INSERT INTO DeviceLocation SET ?;',
    [
      {
        building: location.building,
        room: location.room,
      },
    ],
    (err, res) => {
      if (err) {
        console.log('Error:', err);
        callback(err, null);
        return;
      }

      console.log('Created location: ', { id: res.insertId, ...location });

      callback(null, { id: res.insertId, ...location });
    }
  );
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
  db.query('SELECT * FROM DeviceLocation WHERE id = :id;', { id }, (err, res) => {
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

Location.updateById = (id, location, callback) => {
  db.query(
    'UPDATE DeviceLocation SET building=:building, room=:room WHERE id = :id;',
    { id, ...location },
    (err, res) => {
      if (err) {
        console.log('Error:', err);
        callback(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        callback({ kind: 'not_found' }, null);
        return;
      }

      console.log('Updated location: ', { id, ...location });
      callback(null, { id, ...location });
    }
  );
};

export default Location;
