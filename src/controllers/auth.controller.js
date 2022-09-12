import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import joi from 'joi';
import db from '../database/db.js';

const signUp = async (req, res) => {

    const { name, email, password, repeat_password} = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    const userSchema = joi.object ({
        name: joi.string().required().empty(' '),
        email: joi.string().email().required().empty(' '),
        password: joi.string().min(3).max(10).required(),
        repeat_password: joi.valid(joi.ref('password')).required()
    });

    const validation = userSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail => detail.message));
        return res.status(422).send(errors);
    }
    
    try {

        const user = await db.collection('users').findOne({ email });

        if (user) {
            return res.status(409).send('Esse usuário já existe!');
        }        

        await db.collection('users').insertOne({ name, email , password: passwordHash });
        
        res.sendStatus(201);

    } catch (error) {

        console.log(error.message);
        res.sendStatus(500);

    }
};

const signIn = async (req, res) => {

    const { email, password } = req.body;

    try {

        const user = await db.collection('users').findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {

            const token = uuid();
            db.collection('sessions').insertOne({
                token,
                userId: user._id,
            });
          
            return res.send(token);
        }

        else {

            return res.status(401).send('Dados inválidos! Verifique e tente novamente!');

        }
        
    } catch (error) {

        console.log(error.message);
        res.sendStatus(500);

    }  
};

const logout = async (req, res) => {

    const token = res.locals.token;

    try {
        
        await db.collection('sessions').deleteOne({token});

        res.sendStatus(200);
        
    } catch (error) {

        console.log(error.message);
        res.sendStatus(500);
        
    }
};

export { signUp, signIn, logout };