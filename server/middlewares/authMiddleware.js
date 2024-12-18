// authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel'); // Adjust path as needed

// Middleware to protect routes
const protectRoute = async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization && 
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      
      // Find user by ID from token, exclude password
      req.user = await User.findById(decoded.userId).select('-password');

      // If user found, proceed to next middleware
      if (req.user) {
        return next();
      }
    } catch (error) {
      console.error('JWT Verification Error:', error);
      return res.status(401).json({ 
        message: 'Not authorized, token failed' 
      });
    }
  }

  // Check for Passport OAuth session
  if (req.isAuthenticated()) {
    return next();
  }

  // If no authentication methods work
  // return res.status(401).json({ 
  //   message: 'Not authorized, no token or active session' 
  // });
};

// Optional: Role-based access control
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'You do not have permission to access this route' 
      });
    }

    next();
  };
};

module.exports = { 
  protectRoute, 
  authorizeRoles 
};