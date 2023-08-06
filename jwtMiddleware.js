const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    console.log('Token:', token);
    const tokenTreated = req.headers.authorization.split(' ')[1] //remove the word bearer from the array
    console.log(tokenTreated)
    const secret_key = '12345abc' // In production use environment variables


    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(tokenTreated, `${secret_key}`, (err, decoded) => {

        console.log(`Decoded: ${JSON.stringify(decoded)}`);

        if (err) {
            console.error('Token verification error:', err);
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }


        req.userId = decoded.userId;
        next();
    });

}
module.exports = verifyToken;