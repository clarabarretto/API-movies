import { Router } from 'express';
import tokenController from '../controllers/TokenController';
import tokenSchema from '../schema/tokenSchema';
import Validate from '../schema/validate';

const router = new Router();

router.post('/', Validate(tokenSchema.store), tokenController.store);

export default router;
