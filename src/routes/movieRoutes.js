import { Router } from 'express';
import movieController from '../controllers/MovieController';
import movieSchema from '../schema/movieSchema';

import loginRequired from '../middlewares/loginRequired';
import Validate from '../schema/validate';

const router = new Router();
router.get('/', loginRequired, movieController.index);
router.get('/:id', loginRequired, Validate(movieSchema.search), movieController.show);
router.post('/', loginRequired, Validate(movieSchema.store), movieController.store);
router.put('/:id', loginRequired, Validate(movieSchema.update), movieController.update);
router.delete('/:id', loginRequired, Validate(movieSchema.search), movieController.delete);

export default router;
