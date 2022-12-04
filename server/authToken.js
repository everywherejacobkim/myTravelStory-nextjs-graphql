const jwt = require('jsonwebtoken');
require('dotenv').config();

const authToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ errors: [{ msg: 'Token not found' }] });
    } 

    // verify token
    try {
        const user = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user.email;
        next();
    } catch (err) {
        res.status(403).json({ errors: [{ msg: 'Invalid token' }] });
    }
}

module.exports = authToken;
