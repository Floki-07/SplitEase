// index.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
// const config = require('./config.js');
require('./passport');
const app = express();

// connect to database
const mongoUrl = process.env.DB_URI;
const db = mongoose.connect(mongoUrl);

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Credentials'],
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


app.use((req, res, next) => {
  if (!req.user) {
    res.status(401).json({ error: "Unauthorized" });
  }
  next(); // This continues even after a response is sent
});

app.get('/api/isLoggedIn', (req, res) => {
  if (req.user) {
    res.json({ isValid: true });
  } else {
    res.status(401).json({ isValid: false }); // This could trigger the error
  }
});


app.post('/api/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ message: 'Failed to log out.' });
    }
    res.clearCookie('connect.sid'); // Clear session cookie
    res.status(200).json({ message: 'Logged out successfully.' });
  });
});














app.listen(3000, (err, client) => {
  if (err) return console.log('Server not connected: ', err);
  console.log("Server is connected at PORT: 3000");
  if (db) {
    console.log('MongoDB is connected');
  }
})