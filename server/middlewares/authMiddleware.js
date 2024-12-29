const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Adjust path as needed
require('dotenv').config();

// Middleware to protect routes
const protectRoute = async (req, res, next) => {
  try {
    // 1. Check for Passport.js OAuth session (for OAuth users)
    if (req.isAuthenticated()) {
      console.log('User authenticated via OAuth');
      req.user = req.user || {}; // Attach user from Passport session if needed
      return next();
    } 

    // 2. Check for JWT in Authorization header (for users using JWT)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
      }

      // Verify JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded JWT:', decoded);

      // Attach user to request
      req.user = await User.findById(decoded.userId).select('-password');
      if (!req.user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return next();
    }

    // 3. If neither method is valid, reject the request
    return res.status(401).json({
      message: 'Not authorized, no token or active session',
    });
  } catch (error) {
    console.error('Error in protectRoute middleware:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


// Optional: Role-based access control
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'You do not have permission to access this route',
      });
    }

    next();
  };
};

module.exports = {
  protectRoute,
  authorizeRoles,
};
