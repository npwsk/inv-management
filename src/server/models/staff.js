import db from '../db';

const StaffMember = function (staff) {
  this.firstName = staff.firstName;
  this.middleName = staff.middleName;
  this.lastName = staff.lastName;
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
  db.query('SELECT * FROM StaffMember WHERE id = ?;', id, (err, res) => {
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

export default StaffMember;
