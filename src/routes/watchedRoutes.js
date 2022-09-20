import { Router } from 'express';
import WatchedController from '../controllers/WatchedController';
import watchedSchema from '../schema/watchedSchema';

import loginRequired from '../middlewares/loginRequired';
import Validate from '../schema/validate';

const router = new Router();
router.get('/', loginRequired, WatchedController.index);
router.get('/:user_id', Validate(watchedSchema.show), loginRequired, WatchedController.show);
router.post('/', Validate(watchedSchema.store), loginRequired, WatchedController.store);
router.put('/:id', Validate(watchedSchema.update), loginRequired, WatchedController.update);
router.delete('/:id', Validate(watchedSchema.search), loginRequired, WatchedController.delete);

export default router;
