import db from "../database/db.js";

async function hasToken (req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    if(!token) return res.sendStatus(401);

    try {

        const session = await db.collection('sessions').findOne({ token });
        
        if (!session) {
            return res.sendStatus(401);
        }

        const user = await db.collection('users').findOne({
            _id: session.userId,
        });

        res.locals.user = user;

        next(); 

    } catch (error) {

        console.log(error.message);
        return res.sendStatus(500);
        
    }
};

export default hasToken;