import db from '../database/db.js';

const listUser = async (req, res) => {

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

        delete user.password;
        return res.send(user);

    } catch (error) {

        console.log(error.message);
        res.sendStatus(500);
        
    }
};

export { listUser };