import Board from '../models/board';

export const create = (req, res) => {
  // Check if request is valid
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  // Create new board
  const board = new Board({
    manufacturer: req.body.manufacturer,
    model: req.body.model,
    diagSize: req.body.diagSize,
    inventoryNumber: req.body.inventoryNumber,
    registrationDate: req.body.registrationDate,
    usageStartDate: req.body.usageStartDate,
    deprecationPeriod: req.body.deprecationPeriod,
    repairStartDate: req.body.repairStartDate,
    failureReason: req.body.failureReason,
    state: req.body.state,
    technology: req.body.technology,
    locationId: req.body.locationId,
    staffMemberId: req.body.staffMemberId,
  });

  // Save board in database
  Board.create(board, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Board.',
      });
    } else {
      res.send(data);
    }
  });
};

// Get all boards or all boards with condition
export const findAll = (req, res) => {
  const { inventoryNumber, state } = req.query;

  Board.getAll({ inventoryNumber, state }, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving boards.',
      });
    } else {
      res.send(data);
    }
  });
};

// Get board by id
export const findById = (req, res) => {
  Board.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found board with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving board with id ${req.params.id}`,
        });
      }
    } else res.send(data);
  });
};

// Get all boards to be deprecated in a given number of months
export const findAllDeprecIn = (req, res) => {
  const { left } = req.query;

  Board.getAllDeprecatedIn(left, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving boards.',
      });
    } else {
      res.send(data);
    }
  });
};

// Update a board by id
export const update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  console.log(req.body);

  const { id } = req.params;

  Board.updateById(id, new Board(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found board with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating board with id ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

// Delete a board by id
export const remove = (req, res) => {
  const { id } = req.params;

  Board.remove(id, (err) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found board with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: `Could not delete board with id ${id}.`,
        });
      }
    } else {
      res.send({ message: `Board was deleted successfully!` });
    }
  });
};
