const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String },
    balance: { type: Number, default: 0 }, //- i owe him //
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
    },
}, { timestamps: true });

const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
