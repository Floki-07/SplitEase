// index.js

require('dotenv').config();
require('./middlewares/passport');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/UserModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

// connect to database
const mongoUrl = process.env.DB_URI;
const db = mongoose.connect(mongoUrl);

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Credentials','Authorization'],
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




app.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));

app.get("/auth/google/callback", passport.authenticate("google", {
  successRedirect: 'http://localhost:5173/home', // to client
  failureRedirect: "/auth/login/failed"
}));

app.get('/auth/login/success', async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "successful",
    user: req.user,
    corrId: req.headers['x-correlation-id']
  });
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
  console.log('Token',token);  

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

app.get('/api/getUserInfo', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});


app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      // Return immediately if there's an error
      return res.status(500).json({ message: 'Failed to log out.' });
    }

    // Clear the session cookie
    res.clearCookie('connect.sid', { path: '/' });

    // Send the response
    res.status(200).json({ message: 'Logged out successfully.' });
  });
});

// 
//Api for email - password login
// 
app.post('/api/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' }); // Exit here
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Send a success response
    return res.status(201).json({ success: true, message: 'Signup successful!' });
  } catch (error) {
    console.error(error);

    // Send an error response for unexpected issues
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});
// Replace with the actual path to your User model

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    // Check if the user logged in with OAuth
    if (user.oauthProvider) {
      // Generate token for OAuth users as well
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '12h' } // Token will expire in 1 hour
      );

      return res.status(200).send({ message: 'Login successful with OAuth', token });
    }

    // Compare the password if it exists
    if (!password) {
      return res.status(400).send({ error: 'Password required for standard login' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ error: 'Invalid credentials' });
    }

    // Generate token after password match
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '12h' } // Token valid for 1 hour
    );

    // Send the token to the frontend
    res.status(200).send({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});




app.listen(3000, (err, client) => {
  if (err) return console.log('Server not connected: ', err);
  console.log("Server is connected at PORT: 3000");
  if (db) {
    console.log('MongoDB is connected');
  }
})