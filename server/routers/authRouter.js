const { protectRoute, authorizeRoles } = require('../middlewares/authMiddleware');
require('dotenv').config();
require('../middlewares/oauthMiddleware');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const User = require('../models/UserModel')
const Transaction = require('../models/TransactionModel')
const Goal=require('../models/GoalModel')
const Friend=require('../models/FriendModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();
router.get('/getUserInfo', protectRoute, async (req, res) => {
    let userId;
    // Determine user authentication type (OAuth or token-based)
    if (req.user) {
        // OAuth-based user
        userId = req.user._id;
    } else {
        // Token-based user
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.userId;
        } catch (error) {
            console.error('JWT verification failed:', error);
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
    }
    const user = await User.findById(userId).populate('transactions goals friends');
    if (user) {
        res.status(200).json({ user });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

router.get('/isLoggedIn', (req, res) => {
    // Check for user from OAuth (e.g., req.user)
    if (req.isAuthenticated()) {
        const user = req.user;
        return res.json({
            isValid: true,
            userId: user._id,
            email: user.email,
            loginMethod: 'oauth'
        });
    }
    // Check for JWT token from email-password login
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    // console.log('Token', token);

    if (token) {
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the same secret as used during token creation
            return res.json({ isValid: true, userId: decoded.userId });
        } catch (err) {
            console.error('Token verification failed:', err);
            return res.status(401).json({ isValid: false, message: 'Invalid token.' });
        }
    }
    // If no valid login is found
    return res.status(401).json({ isValid: false, message: 'User not logged in.' });
});

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            // Return immediately if there's an error
            return res.status(500).json({ message: 'Failed to log out.' });
        }

        // Clear the session cookie
        res.clearCookie('connect.sid', { path: '/' });

        // Send the response
        res.status(200).json({ message: 'Logged out successfully.' });
    });
});

// 
// for email - password login
// 
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' }); // Exit here
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Send a success response
        return res.status(201).json({ success: true, message: 'Signup successful!' });
    } catch (error) {
        console.error(error);

        // Send an error response for unexpected issues
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
});
// Replace with the actual path to your User model

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Check if the user logged in with OAuth
        if (user.oauthProvider) {
            // Generate token for OAuth users as well
            const token = jwt.sign(
                { userId: user._id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '12h' } // Token will expire in 1 hour
            );

            return res.status(200).send({ message: 'Login successful with OAuth', token });
        }

        // Compare the password if it exists
        if (!password) {
            return res.status(400).send({ error: 'Password required for standard login' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        // Generate token after password match
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '12h' } // Token valid for 1 hour
        );

        // Send the token to the frontend
        res.status(200).send({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


router.post('/onboardingdetails', protectRoute, async (req, res) => {
    try {
        let userId;

        // Determine user authentication type (OAuth or token-based)
        if (req.user) {
            // OAuth-based user
            userId = req.user._id;
            console.log('Inside OAuth block, user ID:', userId);
        } else {
            // Token-based user
            const token = req.headers.authorization?.split(' ')[1];

            // console.log("Authorization Header:", authHeader);
            if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.userId;
                console.log('Token-based user, user ID:', userId);
            } catch (error) {
                console.error('JWT verification failed:', error);
                // return res.status(401).json({ success: false, message: 'Invalid token' });
            }
        }

        // Validate and extract budget value from the request body
        const { budget } = req.body;

        // Update user details in the database
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { budget, verified: true } }, // Update budget and reset verified to false
            { new: true } // Return the updated user document
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        console.log('updated user:', updatedUser);
        res.status(200).json({
            success: true,
            message: 'Onboarding details updated successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error updating onboarding details:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/addincome', protectRoute, async (req, res) => {
    try {
        let userId;

        // Determine user authentication type (OA uth or token-based)
        if (req.user) {
            // OAuth-based user
            userId = req.user._id;
            // console.log('Inside OAuth block, user ID:', userId);
        } else {
            // Token-based user
            const token = req.headers.authorization?.split(' ')[1];

            if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.userId;
                // console.log('Token-based user, user ID:', userId);
            } catch (error) {
                console.error('JWT verification failed:', error);
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }
        }

        // Validate and extract transaction data from the request body
        const { income, description, date } = req.body.obj;

        const [day, month, year] = date.split('/');
        const updateddate = new Date(`${year}-${month}-${day}`);
        // Create a new transaction document

        const newTransaction = await Transaction.create({
            type: 'income',
            amount: income,
            description,
            date: updateddate,
            user: userId,
        });

        // Push the new transaction into the user's transactions array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { transactions: newTransaction._id } },
            { new: true }
        ).populate('transactions'); // Populate the transactions array with transaction details
        updatedUser.totalincome = parseInt(updatedUser.totalincome) + parseInt(income);
        updatedUser.save();
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // console.log('Updated user:', updatedUser);
        res.status(200).json({
            success: true,
            message: 'Transaction added successfully',
            user: updatedUser,
        });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

router.post('/addexpense', protectRoute, async (req, res) => {
    try {
        let userId;

        // Determine user authentication type (OAuth or token-based)
        if (req.user) {
            // OAuth-based user
            userId = req.user._id;
        } else {
            // Token-based user
            const token = req.headers.authorization?.split(' ')[1];


            if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            try {
                console.log(process.env.JWT_SECRET)
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.userId;
                console.log('Token-based user, user ID:', userId);
            } catch (error) {
                console.error('JWT verification failed:', error);
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }
        }
        // Validate and extract transaction data from the request body
        let { expense, description, date, category } = req.body.expenseData;

        let updateddate = date.split('T')[0];
        // Retrieve the user to validate totalincome and totalexpense
        let user = await User.findById(userId).populate('transactions');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if totalincome is sufficient for the new expense
        const currExpense = parseInt(expense);
        if (user.totalincome < currExpense) {
            return res.status(403).json({
                success: false,
                message: 'Insufficient income for this expense',
            });
        }

        // Create a new transaction document
        const newTransaction = await Transaction.create({
            type: 'expense',
            amount: expense,
            description,
            date: updateddate,
            category,
            user: userId,
        });

        // Update the user's transactions, totalexpense, and totalincome
        user.transactions.push(newTransaction._id);
        user.totalexpense += currExpense;
        user.totalincome -= parseInt(currExpense); // Deduct expense from total income
        console.log(category);
        
        user.categorywise[category]+=parseInt(expense);

        await user.save();

        // Repopulate the transactions array after saving
        user = await User.findById(userId).populate('transactions');

        console.log('Updated user:', user);
        res.status(200).json({
            success: true,
            message: 'Transaction added successfully',
            user,
        });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


router.post('/addgoal', protectRoute, async (req, res) => {
    try {
        let userId;

        // Determine user authentication type (OAuth or token-based)
        if (req.user) {
            // OAuth-based user
            userId = req.user._id;
        } else {
            // Token-based user
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.userId;
            } catch (error) {
                console.error('JWT verification failed:', error);
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }
        }
        // Validate and extract transaction data from the request body
        let { goalName, amount, date } = req.body.goal;
        
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        // Create a new gaol document
        const newgoal = await Goal.create({
            name:goalName,
            target:amount,
            deadline:date,
            userId
          });
      
        user.goals.push(newgoal._id);
        user.save()
        // Repopulate the transactions array after saving
        user = await User.findById(userId).populate('goals');

        console.log('Updated user:', user);
        res.status(200).json({
            success: true,
            message: 'Goal added successfully',
            user,
        });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});



router.post('/addmoneytogoal/:id', protectRoute, async (req, res) => {
    try {
        let userId;
        // Determine user authentication type (OAuth or token-based)
        if (req.user) {
            userId = req.user._id; // OAuth-based user
        } else {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.userId;
            } catch (error) {
                console.error('JWT verification failed:', error);
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }
        }

        // Validate request data
        let { addMoneyAmount } = req.body;
        if (!addMoneyAmount || isNaN(addMoneyAmount) || addMoneyAmount <= 0) {
            return res.status(400).json({ success: false, message: 'Invalid amount provided' });
        }
        // Retrieve user and goal
        const user = await User.findById(userId).populate('goals');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const goal = await Goal.findById(req.params.id);
        if (!goal) {
            return res.status(404).json({ success: false, message: 'Goal not found' });
        }

        // Update goal and user
        if (user.totalincome < addMoneyAmount) {
            return res.status(403).json({
                success: false,
                message: 'Insufficient income for this savings',
            });
        }
        if (goal.target < addMoneyAmount) {
            return res.status(403).json({
                success: false,
                message: 'Saved amount should be less than target',
            });
        }

        goal.saved += parseInt(addMoneyAmount);
        await goal.save();

        const description = `Goal: ${goal.name}`;
        const category = 'Savings';

        if (user.totalincome < addMoneyAmount) {
            return res.status(403).json({
                success: false,
                message: 'Insufficient income for this savings',
            });
        }


        const newTransaction = await Transaction.create({
            type: 'savings',
            amount: addMoneyAmount,
            description,
            category,
            user: userId,
        });
        console.log(newTransaction);

        
        user.transactions.push(newTransaction._id);

        // Optional: If adding money to savings should not decrease income, remove this line
        user.totalincome -= parseInt(addMoneyAmount);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Money added to goal successfully',
            user,
        });
    } catch (error) {
        console.error('Error adding money to goal:', error);
        res.status(500).json({ success: false, message: 'Failed to add money to goal' });
    }
});


router.delete('/deletegoal/:id', protectRoute, async (req, res) => {
    try {
      const goalId = req.params.id;
      const goal = await Goal.findByIdAndDelete(goalId); // Replace with your database logic
      if (!goal) {
        return res.status(404).json({ success: false, message: "Goal not found" });
      }
      res.json({ success: true, message: "Goal deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error });
    }
  });
router.post('/addfriend', protectRoute, async (req, res) => {
    try {
        let userId;

        // Determine user authentication type (OAuth or token-based)
        if (req.user) {
            // OAuth-based user
            userId = req.user._id;
        } else {
            // Token-based user
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.userId;
            } catch (error) {
                console.error('JWT verification failed:', error);
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }
        }
        // Validate and extract transaction data from the request body
        let { name, phone } = req.body.obj;
        
        let user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        // Create a new gaol document
        const newfriend = await Friend.create({
            name,
            phone,
        });
      
        user.friends.push(newfriend?._id);
        user.save()
        // Repopulate the transactions array after saving
        user = await User.findById(userId).populate('friends');

        console.log('Updated user:', user);
        res.status(200).json({
            success: true,
            message: 'Friend added successfully',
            user,
        });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
router.post('/splitwithfriend', protectRoute, async (req, res) => {
    try {
        let userId;

        // Determine user authentication type (OAuth or token-based)
        if (req.user) {
            // OAuth-based user
            userId = req.user._id;
        } else {
            // Token-based user
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: 'No token provided' });
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                userId = decoded.userId;
            } catch (error) {
                console.error('JWT verification failed:', error);
                return res.status(401).json({ success: false, message: 'Invalid token' });
            }
        }
        // Validate and extract transaction data from the request body
        let { friendId,bill,description,category ,userExpense ,friendExpense,paidByuser} = req.body.obj;
        

        
        let user = await User.findById(userId);
        let friend=await Friend.findById(friendId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        
        //1000-800U 200F
        // + he owes me 
        // - i owe him
        let newTransaction;
        if (paidByuser) {
            // User paid for the bill
            newTransaction = await Transaction.create({
                amount: parseFloat(bill),
                friend: friend._id,
                friendname: friend.name,
                description,
                type: 'expense',
                category,
                moneySpent: parseFloat(userExpense),  // User's share of the expense
                moneyowed: parseFloat(friendExpense), // Friend owes this amount to the user
                moneyweowe: 0, // User owes nothing since they paid
                personal: false,
            });
            // Update friend's balance to reflect their debt
            friend.balance += parseInt(friendExpense);
            user.totalexpense+=parseInt(bill);
            user.totalincome-=parseInt(bill);
            user.categorywise.category+=parseInt(userExpense)
            user.amountspent+=parseInt(bill);
            user.amountowed += parseInt(friendExpense);
        } else {
            // Friend paid for the bill
            newTransaction = await Transaction.create({
                amount: parseFloat(bill),
                friend: friend._id,
                friendname: friend.name,
                type: 'expense',
                category,
                moneySpent: parseFloat(userExpense),  // User's share of the expense
                moneyowed: 0, // Friend owes nothing since they paid
                moneyweowe: parseFloat(userExpense), // User owes this amount to the friend
                personal: false,
            });
            user.amountspent+=parseFloat(bill);
            user.amountheowes += parseFloat(userExpense);
           // Update friend's balance to reflect the user's debt
            friend.balance -= parseFloat(userExpense);
        }
        friend.save()
        user.transactions.push(newTransaction);
        user.save()
        // Repopulate the transactions array after saving
        user = await User.findById(userId).populate('friends');

        console.log('Updated user:', user);
        res.status(200).json({
            success: true,
            message: 'Bill split successfull',
            user,
        });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });

module.exports = router;