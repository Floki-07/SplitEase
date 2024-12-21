// index.js

require('dotenv').config();
require('./middlewares/oauthMiddleware');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authRouter = require('./routers/authRouter')

const app = express();

// connect to database
const mongoUrl = process.env.DB_URI;
const db = mongoose.connect(mongoUrl);

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Credentials', 'Authorization', 'x-correlation-id'],
  credentials: true // mandoatory for google auths
}));

// session middleware
app.use(session({
  secret: '1234',
  resave: false,
  saveUninitialized: false,
}));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', authRouter)


app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: 'http://localhost:5173/home', // to client
  failureRedirect: "/auth/login/failed"
}));

app.get('/auth/login/success', async (req, res) => {
  if (req.isAuthenticated()) 
  {

    
    const token=req.token;
    
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      corrId: req.headers['x-correlation-id']
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Failed to fetch user"
    });
  }
});

app.get('/auth/login/failed', async (req, res) => {
  return res.status(401).json({
    success: false,
    message: "failure"
  });
});



app.get('/api/isLoggedIn', (req, res) => {
  // Check for user from OAuth (e.g., req.user)
  if (req.isAuthenticated()) {
    const user = req.user;
    return res.json({
      isValid: true,
      userId: user._id,
      email: user.email,
      loginMethod: 'oauth'
    });
  }
  // Check for JWT token from email-password login
  const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  // console.log('Token', token);

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the same secret as used during token creation
      return res.json({ isValid: true, userId: decoded.userId });
    } catch (err) {
      console.error('Token verification failed:', err);
      return res.status(401).json({ isValid: false, message: 'Invalid token.' });
    }
  }
  // If no valid login is found
  return res.status(401).json({ isValid: false, message: 'User not logged in.' });
});





app.listen(3000, (err, client) => {
  if (err) return console.log('Server not connected: ', err);
  console.log("Server is connected at PORT: 3000");
  if (db) {
    console.log('MongoDB is connected');
  }
})