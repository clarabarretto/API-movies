import { Router } from 'express';
import coverController from '../controllers/CoverController';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/:movie_id', loginRequired, coverController.store);

export default router;
