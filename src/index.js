import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from './routers/auth.routers.js'
import userRouter from './routers/user.routers.js'
import transactionsRouter from './routers/transactions.routers.js'

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json());

app.use(authRouter);
app.use(userRouter);
app.use(transactionsRouter);

app.listen(5000, () => console.log('listening on port 5000'));