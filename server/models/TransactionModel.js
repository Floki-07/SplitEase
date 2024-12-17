const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    groupName: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Group',
    },
    friendName: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Friend',
    },
    date: { type: Date, default: Date.now },
    category: { type: String, required: true }, // e.g., grocery, commute, etc.
    description: { type: String },
    moneySpent: { type: Number, default: 0 },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
