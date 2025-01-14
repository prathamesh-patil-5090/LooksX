const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    console.log('User role:', user.role); // Debug log
    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Invalid token' });
  }
};

const isBarber = (req, res, next) => {
  if (!req.user || req.user.role !== 'barber') {
    console.log('User role verification failed:', req.user?.role); // Debug log
    return res.status(403).json({ 
      message: 'Access denied. Barbers only.',
      userRole: req.user?.role 
    });
  }
  next();
};

module.exports = { protect, isBarber };
