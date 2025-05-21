const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Authorization header missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token missing' });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded; // decoded contains user info like id and isAdmin
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).json({ message: 'Admin access required' });
  next();
};

module.exports = {
  verifyToken,
  isAdmin
};
