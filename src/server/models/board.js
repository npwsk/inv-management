import db from '../db';

const Board = function (board) {
  this.manufacturer = board.manufacturer;
  this.model = board.model;
  this.diagSize = board.diagSize;
  this.inventoryNumber = board.inventoryNumber;
  this.registrationDate = board.registrationDate;
  this.usageStartDate = board.usageStartDate;
  this.deprecationPeriod = board.deprecationPeriod;
  this.repairStartDate = board.repairStartDate;
  this.failureReason = board.failureReason;
  this.state = board.state;
  this.technology = board.technology;
  this.locationId = board.locationId;
  this.staffId = board.staffId;
};

Board.create = (board, callback) => {
  db.query(
    'INSERT INTO InteractiveBoard SET ?;',
    [
      {
        location_id: board.locationId,
        staff_id: board.staffId,
        manufacturer: board.manufacturer,
        model: board.model,
        diag_size: board.diagSize,
        inventory_number: board.inventoryNumber,
        registration_date: board.registrationDate,
        usage_start_date: board.usageStartDate,
        deprecation_period: board.deprecationPeriod,
        repair_start_date: board.repairStartDate,
        failure_reason: board.failureReason,
        state: board.state,
        technology: board.technology,
      },
    ],
    (err, res) => {
      if (err) {
        console.log('Error:', err);
        callback(err, null);
        return;
      }

      console.log('Created board: ', { id: res.insertId, ...board });

      callback(null, { id: res.insertId, ...board });
    }
  );
};

Board.findById = (id, callback) => {
  db.query('SELECT * FROM InteractiveBoard WHERE board_id = :id;', { id }, (err, res) => {
    if (err) {
      console.log('Error:', err);
      callback(err, null);
      return;
    }

    if (res.length) {
      console.log('Found board: ', res[0]);
      callback(null, res[0]);
      return;
    }

    result({ kind: 'not_found' }, null);
  });
};

Board.getAll = ({ inventoryNumber, state }, callback) => {
  let queryString = 'SELECT * FROM InteractiveBoard';

  if (inventoryNumber) {
    queryString += ' WHERE inventory_number=:inventoryNumber';
  }

  if (state) {
    queryString += ' WHERE state=:state';
  }

  db.query(queryString, { state, inventoryNumber }, (err, res) => {
    if (err) {
      console.log('Error:', err);
      callback(null, err);
      return;
    }

    console.log('Boards:', res);
    callback(null, res);
  });
};

Board.getAllDeprecatedIn = (months, callback) => {
  db.query(
    'SELECT * FROM InteractiveBoard WHERE ' +
      'DATE_ADD(usage_start_date, INTERVAL deprecation_period MONTH)' +
      '<= DATE_ADD(CURDATE(), INTERVAL :months MONTH) ' +
      'AND state <> "не исправно";',
    { months },
    (err, res) => {
      if (err) {
        console.log('Error:', err);
        callback(null, err);
        return;
      }

      console.log('Boards:', res);
      callback(null, res);
    }
  );
};

Board.updateById = (id, board, callback) => {
  db.query(
    'UPDATE InteractiveBoard SET location_id = :locationId, staff_id = :staffId, ' +
      'manufacturer = :manufacturer, model = :model, diag_size = :diagSize, ' +
      'inventory_number = :inventoryNumber, registration_date = :registrationDate, ' +
      'usage_start_date = :usageStartDate, deprecation_period = :deprecationPeriod, ' +
      'repair_start_date = :repairStartDate, failure_reason = :failureReason, ' +
      'state = :state, technology = :technology WHERE board_id = :id;',
    { id, ...board },
    (err, res) => {
      if (err) {
        console.log('Error:', err);
        callback(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found board with the id
        callback({ kind: 'not_found' }, null);
        return;
      }

      console.log('Updated board: ', { id, ...board });
      callback(null, { id, ...board });
    }
  );
};

Board.remove = (id, callback) => {
  db.query('DELETE FROM InteractiveBoard WHERE board_id = ?;', id, (err, res) => {
    if (err) {
      console.log('Error: ', err);
      callback(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found board with the id
      callback({ kind: 'not_found' }, null);
      return;
    }

    console.log('Deleted board with id:', id);
    callback(null, res);
  });
};

export default Board;
