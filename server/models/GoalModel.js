const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a goal name'],
        trim: true
    },
    target: {
        type: Number,
        required: [true, 'Please add a target amount'],
        min: [0, 'Target amount cannot be negative']
    },
    saved: {
        type: Number,
        default: 0,
        min: [0, 'Saved amount cannot be negative']
    },
    deadline: {
        type: Date,
        required: [true, 'Please add a deadline']
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Calculate progress before saving
goalSchema.pre('save', function (next) {
    this.progress = Math.min(100, Math.round((this.saved / this.target) * 100));
    this.completed = this.saved >= this.target;
    next();
});

const Goal = mongoose.model('Goal', goalSchema);
module.exports = Goal;
