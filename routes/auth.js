const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    //const authtoken = req.header('token_key');
    const authtoken = req.body.token;
    if(!authtoken) return res.status(401).send({ message: "Access denied"})
    jwt.verify(authtoken, process.env.ACCESS_TOKEN, (err, user) => {
        if(err) return res.status(400).send({ message: 'Credentials are wrong'});
        req.user = user;
        next();
    });
}

module.exports = auth;