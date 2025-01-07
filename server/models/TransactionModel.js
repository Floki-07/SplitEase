const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: { type: Number },
    groupName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    },
    friendName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend',
    },
    type: {
        type: String,
        enum: ['income', 'expense','savings'], // Type can only be 'income' or 'expense'
    },
    date: { type: Date, default: Date.now },
    category: { type: String, }, // e.g., grocery, commute, etc.
    description: { type: String },
    moneySpent: { type: Number, default: 0 },
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
