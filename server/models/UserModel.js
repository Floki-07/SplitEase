const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String }, // Only for email-password users
    oauthProvider: { type: String }, // e.g., 'google', 'github'
    oauthId: { type: String },
    avatar: { type: String },
    
    totalincome: { type: Number, default: 0 },//total this is decreasing and we dont want that //dont touch this value
    totalexpense: { type: Number, default: 0 },//always inc
    balance: { type: Number, default: 0 }, //


    amountowed: { type: Number, default: 0 },
    amountheowes: { type: Number, default: 0 },    
    amountspent: { type: Number, default: 0 },
    budget: { type: Number, default: 0 },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend',
    }],
    goals: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal',
    }],
    
    transactions: [  // Fixed the spelling here
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
        }
    ],

    categorywise: {
        grocery: { type: Number, default: 0 },
        restaurant: { type: Number, default: 0 },
        commute: { type: Number, default: 0 },
        bills: { type: Number, default: 0 },
        stationary: { type: Number, default: 0 },
        trips: { type: Number, default: 0 },
        micellaneous: { type: Number, default: 0 },
    },
    verified: { type: Boolean, default: false },


}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
