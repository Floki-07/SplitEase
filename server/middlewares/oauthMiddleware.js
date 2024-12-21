require('dotenv').config();
const passport = require('passport');
const User = require('../models/UserModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
    scope: ["profile", "email"]
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            // console.log('Profile', profile);
            
            let user = await User.findOne({ email: profile.emails?.[0]?.value });
            
            if (!user) {
                // Ensure essential fields exist
                if (!profile.displayName || !profile.photos?.[0]?.value) {
                    throw new Error("Missing essential profile information from Google.");
                }
                
                // Build the user object dynamically
                const newUser = {
                    oauthProvider: 'google',
                    oauthId:profile.id,
                    username: profile.displayName,
                    avatar: profile.photos[0].value,
                };
                
                // Add email if available
                if (profile.emails?.[0]?.value) {
                    newUser.email = profile.emails[0].value;
                } else {
                    console.warn("Email not available in profile; user will be created without email.");
                }
                
                // Create the user
                user = await User.create(newUser);
                
                // Add JWT token signing with a secret key from .env
                const token = jwt.sign(
                    { userId: user._id }, 
                    process.env.JWT_SECRET, // Make sure to add this to your .env file
                    { expiresIn: '1d' } // Optional: add an expiration
                );
                
                // Attach token to user object
                user.token = token;
         
                
            } else {
                user = await User.findOneAndUpdate(
                    { email: profile.emails?.[0]?.value }, // Query condition to match the user by email
                    { avatar: profile.photos[0]?.value }, // Update field to change the avatar
                    { new: true, upsert: false } // Options: return the updated document, do not create if not found
                );
                
                // Generate a new token for existing user
                const token = jwt.sign(
                    { userId: user._id }, 
                    process.env.JWT_SECRET, 
                    { expiresIn: '1d' }
                );
                
                // Attach token to user object
                user.token = token;
            }
            
            // console.log("User profile successfully processed:", user);  
            
            // Change 'callback' to 'done' as this is a Passport strategy
            return done(null, { ...user.toObject(), token: user.token });
        } catch (err) {
            console.error("Error during user profile processing:", err);
            return done(new Error("An error occurred while processing the user profile: " + err.message), null);
        }
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

