import express from 'express';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/user', userController.listUser);

export default router;