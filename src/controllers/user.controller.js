const listUser = async (req, res) => {

    const user = res.locals.user;

    try {

        delete user.password;
        return res.send(user);

    } catch (error) {

        console.log(error.message);
        res.sendStatus(500);
        
    }
};

export { listUser };