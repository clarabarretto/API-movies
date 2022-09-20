import { Router } from 'express';
import userController from '../controllers/UserController';
import userSchema from '../schema/userSchema';

import loginRequired from '../middlewares/loginRequired';
import Validate from '../schema/validate';

const router = new Router();
router.get('/', loginRequired, userController.index);
router.get('/profile', loginRequired, userController.show);
router.post('/', Validate(userSchema.store), userController.store);
router.put('/', loginRequired, Validate(userSchema.update), userController.update);
router.delete('/:id', Validate(userSchema.delete), loginRequired, userController.delete);

export default router;
