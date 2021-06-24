import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const usersRouter = Router();
const usersController = new UsersController();
usersRouter.use(verifyAuthentication);

usersRouter.post('/', usersController.save);

usersRouter.get('/:id', usersController.show);

usersRouter.get('/', usersController.index);

usersRouter.delete('/:id', usersController.destroy);

usersRouter.put('/:id', usersController.update);

export default usersRouter;
