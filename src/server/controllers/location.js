import Location from '../models/location';

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const location = new Location(req.body);

  Location.create(location, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the location.',
      });
    } else {
      res.send(data);
    }
  });
};

export const findAll = (req, res) => {
  Location.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving locations.',
      });
    } else {
      res.send(data);
    }
  });
};

export const findById = (req, res) => {
  Location.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found location with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving location with id ${req.params.id}`,
        });
      }
    } else res.send(data);
  });
};

export const update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  console.log(req.body);

  const { id } = req.params;

  Location.updateById(id, new Location(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found location with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating location with id ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};
