import joi from 'joi';
import dayjs from 'dayjs';
import db from '../database/db.js';

const postTransaction = async (req, res) => { 

    const { value, description, type } = req.body;
    const user = res.locals.user;

    const userSchema = joi.object ({
        value: joi.number().required().empty(' '),
        description: joi.string().required().empty(' '),
        type: joi.string().valid('in', 'out').required().empty(' ')
    });

    const validation = userSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail => detail.message));
        return res.status(422).send(errors);
    }

    const date = dayjs().format('DD/MM');

    try {        

        await db
            .collection('transactions')
            .insertOne({ email: user.email, value, description, type, date });
        
        res.sendStatus(201);
        
    } catch (error) {

        console.log(error.message);
        res.sendStatus(500);
        
    }
};

const listTransactions = async (req, res) => {

    try {

        const user = res.locals.user;
        
        const transactions = await db
            .collection('transactions')
            .find({ email: user.email})
            .toArray();

        return res.status(200).send(transactions);
        
    } catch (error) {
        
        console.log(error.message);
        res.sendStatus(500);

    }
};

export { postTransaction, listTransactions };