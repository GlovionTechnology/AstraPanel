// File: server/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const SECRET_KEY = "HiteshBhaiKaSuperSecretKey"; // Use env variable in production

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const token = bearerHeader.split(' ')[1];
        
        jwt.verify(token, SECRET_KEY, (err, authData) => {
            if (err) {
                return res.status(403).json({ error: "Token Expired or Invalid 🚫" });
            }
            req.authData = authData;
            next(); // Everything is fine, proceed
        });
    } else {
        res.status(403).json({ error: "Token required! 🔒" });
    }
};

module.exports = verifyToken;
