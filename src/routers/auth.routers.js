import express from 'express';
import authorizationMiddleware from '../middlewares/authorization.middleware.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/sign-up', authController.signUp );
router.post('/sign-in', authController.signIn);

router.use(authorizationMiddleware);
router.delete('/logout', authController.logout);

export default router;