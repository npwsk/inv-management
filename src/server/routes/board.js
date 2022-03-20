import express from 'express';

import * as boards from '../controllers/board';

const router = express.Router();

router.post('/', boards.create);

router.get('/', boards.findAll);

router.get('/:id', boards.findById);

router.put('/:id', boards.update);

router.delete('/:id', boards.remove);

export default router;
