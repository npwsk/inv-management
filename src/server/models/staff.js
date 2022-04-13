import db from '../db';

const StaffMember = function (staff) {
  this.firstName = staff.firstName;
  this.middleName = staff.middleName;
  this.lastName = staff.lastName;
};

StaffMember.create = (staff, callback) => {
  db.query(
    'INSERT INTO StaffMember SET ?;',
    [
      {
        first_name: staff.firstName,
        middle_name: staff.middleName,
        last_name: staff.lastName,
      },
    ],
    (err, res) => {
      if (err) {
        console.log('Error:', err);
        callback(err, null);
        return;
      }

      console.log('Created staff member: ', { id: res.insertId, ...staff });

      callback(null, { id: res.insertId, ...staff });
    }
  );
};

StaffMember.getAll = (callback) => {
  db.query('SELECT * FROM StaffMember;', (err, res) => {
    if (err) {
      console.log('Error:', err);
      callback(null, err);
      return;
    }

    console.log('Staff members:', res);
    callback(null, res);
  });
};

StaffMember.findById = (id, callback) => {
  db.query('SELECT * FROM StaffMember WHERE id = :id;', { id }, (err, res) => {
    if (err) {
      console.log('Error:', err);
      callback(err, null);
      return;
    }

    if (res.length) {
      console.log('Found staff: ', res[0]);
      callback(null, res[0]);
      return;
    }

    result({ kind: 'not_found' }, null);
  });
};

StaffMember.updateById = (id, staff, callback) => {
  db.query(
    'UPDATE StaffMember SET first_name=:firstName, middle_name=:middleName, ' +
      'last_name=:lastName WHERE id = :id;',
    { id, ...staff },
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

      console.log('Updated staff member: ', { id, ...staff });
      callback(null, { id, ...staff });
    }
  );
};

export default StaffMember;
