import express from 'express';
import authorizationMiddleware from '../middlewares/authorization.middleware.js';
import * as transactionsController from '../controllers/transactions.controller.js';

const router = express.Router();


router.use(authorizationMiddleware);

router.post('/transactions', transactionsController.postTransaction );
router.get('/transactions', transactionsController.listTransactions);

export default router;