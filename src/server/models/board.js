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
        repair_start_date: board.repairStartDate || null,
        failure_reason: board.failureReason || null,
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
  db.query(
    `SELECT
      inventory_number AS inventoryNumber,
      manufacturer,
      model,
      diag_size AS diagSize,
      registration_date AS registrationDate,
      usage_start_date AS usageStartDate,
      deprecation_period AS deprecationPeriod,
      repair_start_date AS repairStartDate,
      failure_reason AS failureReason,
      state,
      technology,
      location_id AS locationId,
      staff_id AS staffId
    FROM InteractiveBoard
      WHERE inventory_number = :id;`,
    { id },
    (err, res) => {
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
    }
  );
};

Board.getAll = (conditions, callback) => {
  let queryString = `SELECT
      inventory_number AS inventoryNumber,
      manufacturer,
      model,
      diag_size AS diagSize,
      registration_date AS registrationDate,
      usage_start_date AS usageStartDate,
      deprecation_period AS deprecationPeriod,
      repair_start_date AS repairStartDate,
      failure_reason AS failureReason,
      state,
      technology,
      CONCAT("Корпус ", dl.building, ", ауд. ", dl.room) AS location,
      CONCAT(SUBSTRING(sm.first_name, 1, 1), ".", SUBSTRING(sm.middle_name, 1, 1),
        ". ", sm.last_name) AS staff
      FROM InteractiveBoard AS ib`;

  if (conditions.fromRegDate && !conditions.toRegDate) {
    queryString += ' WHERE registration_date >= :fromRegDate';
  }

  if (!conditions.fromRegDate && conditions.toRegDate) {
    queryString += ' WHERE registration_date <= :toRegDate';
  }

  if (conditions.fromRegDate && conditions.toRegDate) {
    queryString += ' WHERE registration_date >= :fromRegDate AND registration_date <= :toRegDate';
  }

  if (conditions.state) {
    queryString += ' WHERE state=:state';
  }

  if (conditions.staffId) {
    queryString += ' WHERE staff_id=:staffId';
  }

  if (conditions.locationId) {
    queryString += ' WHERE location_id=:locationId';
  }

  queryString += `INNER JOIN DeviceLocation AS dl
    ON location_id = dl.id
  INNER JOIN StaffMember AS sm
    ON staff_id = sm.id;`;

  db.query(queryString, conditions, (err, res) => {
    if (err) {
      console.log('Error:', err);
      callback(null, err);
      return;
    }

    console.log('Boards:', res);
    callback(null, res);
  });
};

Board.updateById = (id, board, callback) => {
  db.query(
    `UPDATE InteractiveBoard
      SET
        location_id = :locationId,
        staff_id = :staffId,
        manufacturer = :manufacturer,
        model = :model,
        diag_size = :diagSize,
        registration_date = :registrationDate,
        usage_start_date = :usageStartDate,
        deprecation_period = :deprecationPeriod,
        repair_start_date = :repairStartDate,
        failure_reason = :failureReason,
        state = :state,
        technology = :technology
      WHERE inventory_number = :id`,
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
  db.query('DELETE FROM InteractiveBoard WHERE inventory_number = :id;', { id }, (err, res) => {
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
