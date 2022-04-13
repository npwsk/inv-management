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

Board.getAll = (params, callback) => {
  const normParams = {
    ...params,
    staffId: Number(params.staffId),
    locationId: Number(params.locationId),
  };
  if (normParams) console.log(JSON.stringify(normParams));

  let queryString = `SELECT
      inventory_number AS inventoryNumber,
      manufacturer,
      model,
      diag_size AS diagSize,
      SUBSTRING(registration_date, 1, 10) AS registrationDate,
      SUBSTRING(usage_start_date, 1, 10) AS usageStartDate,
      deprecation_period AS deprecationPeriod,
      SUBSTRING(repair_start_date, 1, 10) AS repairStartDate,
      failure_reason AS failureReason,
      state,
      technology,
      CONCAT("Корпус ", dl.building, ", ауд. ", dl.room) AS location,
      CONCAT(SUBSTRING(sm.first_name, 1, 1), ".", SUBSTRING(sm.middle_name, 1, 1),
        ". ", sm.last_name) AS staff
      FROM InteractiveBoard AS ib`;

  queryString += `INNER JOIN DeviceLocation AS dl
    ON location_id = dl.id
  INNER JOIN StaffMember AS sm
    ON staff_id = sm.id`;

  if (normParams.fromRegDate && !normParams.toRegDate) {
    queryString += ' WHERE registration_date >= :fromRegDate';
  }

  if (!normParams.fromRegDate && normParams.toRegDate) {
    queryString += ' WHERE registration_date <= :toRegDate';
  }

  if (normParams.fromRegDate && normParams.toRegDate) {
    queryString += ' WHERE registration_date >= :fromRegDate AND registration_date <= :toRegDate';
  }

  if (normParams.state) {
    queryString += ' WHERE state=:state';
  }

  if (normParams.staffId) {
    queryString += ' WHERE staff_id=:staffId';
  }

  if (normParams.locationId) {
    queryString += ' WHERE location_id=:locationId';
  }

  db.query(queryString, normParams, (err, res) => {
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
