app.post('/auth/verify-token', async (req, res) => {
    try {
      // Get the token from the Authorization header
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        return res.status(401).json({ isValid: false, message: 'No token provided' });
      }
  
      // Extract token (remove 'Bearer ' prefix)
      const token = authHeader.split(' ')[1];
      console.log(token);
      
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Check if user still exists (optional but recommended)
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(401).json({ isValid: false, message: 'User no longer exists' });
      }
  
      // Token is valid
      res.json({ 
        isValid: true, 
        user: { 
          id: user._id, 
          username: user.username 
        } 
      });
  
    } catch (error) {
      // Handle different types of verification errors
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ isValid: false, message: 'Token expired' });
      }
  
      console.error('Token verification error:', error);
      res.status(401).json({ isValid: false, message: 'Invalid token' });
    }
  });