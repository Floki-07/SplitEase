const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: { type: Number },
    groupName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    },
    friend: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend',
    },
    friendname:{type:String},
    grpname:{type:String},

    type: {
        type: String,
        enum: ['income', 'expense','savings'], // Type can only be 'income' or 'expense'
    },
    date: { type: Date, default: Date.now },
    category: { type: String, }, // e.g., grocery, commute, etc.
    description: { type: String },
    moneySpent: { type: Number, default: 0 },
    moneyowed: { type: Number, default: 0 },
    moneyweowe:{type:Number,default:0},
    personal: { type: Boolean, default: true },

}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
