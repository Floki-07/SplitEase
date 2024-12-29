const Goal = require('../models/GoalModel')

// Get all goals
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user._id });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new goal
const createGoal = async (req, res) => {
  try {
    const { name, target, deadline } = req.body;

    if (!name || !target || !deadline) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const goal = await Goal.create({
      name,
      target,
      deadline,
      userId: req.user.id
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update goal (add money)
const updateGoal = async (req, res) => {
  try {
    const { amount } = req.body;
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.id });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (amount < 0) {
      return res.status(400).json({ message: 'Amount cannot be negative' });
    }

    goal.saved += Number(amount);
    await goal.save();

    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete goal
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user.id });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get goal statistics
const getGoalStats = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.id });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const today = new Date();
    const deadline = new Date(goal.deadline);
    const daysLeft = Math.max(1, Math.ceil((deadline - today) / (1000 * 60 * 60 * 24)));
    const remainingAmount = goal.target - goal.saved;
    const dailySavingsRequired = Math.ceil(remainingAmount / daysLeft);

    res.status(200).json({
      daysLeft,
      dailySavingsRequired,
      remainingAmount,
      progress: goal.progress
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  getGoalStats
};