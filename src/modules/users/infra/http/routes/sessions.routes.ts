import { Router } from 'express';

import SessionController from '../controllers/SessionController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const sessionsRouter = Router();
const sessionController = new SessionController();

sessionsRouter.post('/login', sessionController.create);

sessionsRouter.get('/logout', verifyAuthentication, sessionController.destroy);

export default sessionsRouter;
