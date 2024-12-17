const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
