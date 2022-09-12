import express from 'express';
import authorizationMiddleware from '../middlewares/authorization.middleware.js';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.use(authorizationMiddleware);

router.get('/user', userController.listUser);

export default router;