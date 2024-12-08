const mongoose = require('mongoose');
    
const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String }, // Only for email-password users
    oauthProvider: { type: String }, // e.g., 'google', 'github'
    oauthId: { type: String },
    avatar: {type:String},
    
}, { timestamps: true });

const User = mongoose.model('User', userSchema)

module.exports = User;