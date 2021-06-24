import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.save);

usersRouter.get('/:id', usersController.show);

usersRouter.get('/', usersController.index);

usersRouter.delete('/:id', usersController.destroy);

usersRouter.put('/:id', usersController.update);

export default usersRouter;
