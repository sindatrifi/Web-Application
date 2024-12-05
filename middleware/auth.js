const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function authMiddleware(req, res, next) {
  // Get the token from the request header or query parameter
  const authHeader = req.headers.authorization;

  console.log('authHeader:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Authentication failed: no token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log(decoded.userId);
    req.user = decoded.user;
    res.setHeader('userId', decoded.userId);
    next();
    

  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Authentication failed: invalid token.' });
  }
};

module.exports = authMiddleware;
