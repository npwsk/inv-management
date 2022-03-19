import StaffMember from '../models/staff';

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const staff = new StaffMember(req.body);

  StaffMember.create(staff, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the staff member.',
      });
    } else {
      res.send(data);
    }
  });
};

export const findAll = (req, res) => {
  StaffMember.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving staff members.',
      });
    } else {
      res.send(data);
    }
  });
};

export const findById = (req, res) => {
  StaffMember.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found staff member with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving staff member with id ${req.params.id}`,
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

  StaffMember.updateById(id, new StaffMember(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found staff member with id ${id}.`,
        });
      } else {
        res.status(500).send({
          message: `Error updating staff member with id ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};
