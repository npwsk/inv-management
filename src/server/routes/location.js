import express from 'express';

import * as locations from '../controllers/location';

const router = express.Router();

router.post('/', locations.create);

router.get('/', locations.findAll);

router.get('/:id', locations.findById);

router.put('/:id', locations.update);

export default router;
