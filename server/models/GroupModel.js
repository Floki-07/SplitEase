const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend', // Refers to Frineds in the group
    }],
    moneySpent: { type: Number, default: 0 },
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
