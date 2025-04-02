const jwt = require('jsonwebtoken');
const JWT_SECRET = 'mysecretkey';

// Middleware to protect routes
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided, access denied.' });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);  // Extract token from "Bearer <token>"
        req.user = decoded; // Attach user details to request object
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
}

module.exports = verifyToken;
