import express from 'express';

import * as staff from '../controllers/staff';

const router = express.Router();

router.post('/', staff.create);

router.get('/', staff.findAll);

router.get('/:id', staff.findById);

router.put('/:id', staff.update);

export default router;
